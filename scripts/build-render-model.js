const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT = path.resolve(__dirname, '..');
const SPEC_PATH = path.join(ROOT, 'openapi', 'openapi.yaml');
const OUTPUT_PATH = path.join(ROOT, 'static', 'openapi', 'render-model.json');
const DOWNLOAD_FILE_NAME = 'kairos.openapi.yaml';
const SOURCE_OUTPUT_PATH = path.join(ROOT, 'static', 'openapi', DOWNLOAD_FILE_NAME);

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace'];

function readSpec() {
  return yaml.load(fs.readFileSync(SPEC_PATH, 'utf8'));
}

function readSpecSource() {
  return fs.readFileSync(SPEC_PATH, 'utf8');
}

function ensureOutputDir() {
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
}

function getByRef(spec, ref) {
  if (!ref || typeof ref !== 'string' || !ref.startsWith('#/')) {
    return null;
  }

  return ref
    .slice(2)
    .split('/')
    .reduce((acc, key) => (acc && Object.prototype.hasOwnProperty.call(acc, key) ? acc[key] : null), spec);
}

function clone(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function dereference(spec, value) {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (value.$ref) {
    const resolved = getByRef(spec, value.$ref);
    return resolved ? dereference(spec, resolved) : value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => dereference(spec, item));
  }

  return Object.keys(value).reduce((acc, key) => {
    acc[key] = dereference(spec, value[key]);
    return acc;
  }, {});
}

function normalizeExamples(examples, example) {
  if (examples && typeof examples === 'object') {
    return Object.entries(examples).map(([id, item]) => ({
      id,
      summary: item.summary || null,
      description: item.description || null,
      value: clone(item.value),
      externalValue: item.externalValue || null,
    }));
  }

  if (example !== undefined) {
    return [
      {
        id: 'default',
        summary: null,
        description: null,
        value: clone(example),
        externalValue: null,
      },
    ];
  }

  return [];
}

function normalizeSchema(spec, schemaOrRef) {
  if (!schemaOrRef) {
    return { schemaRef: null, schema: null };
  }

  if (schemaOrRef.$ref) {
    return {
      schemaRef: schemaOrRef.$ref,
      schema: clone(dereference(spec, schemaOrRef)),
    };
  }

  return {
    schemaRef: null,
    schema: clone(schemaOrRef),
  };
}

function normalizeParameters(spec, parameters) {
  const groups = {
    path: [],
    query: [],
    header: [],
    cookie: [],
  };

  (parameters || []).forEach((parameter) => {
    const resolved = dereference(spec, parameter);
    if (!resolved || !resolved.in || !groups[resolved.in]) {
      return;
    }

    const schemaInfo = normalizeSchema(spec, resolved.schema || null);
    groups[resolved.in].push({
      id: `${resolved.in}:${resolved.name}`,
      name: resolved.name,
      in: resolved.in,
      required: Boolean(resolved.required),
      description: resolved.description || null,
      style: resolved.style || null,
      explode: resolved.explode !== undefined ? resolved.explode : null,
      schemaRef: schemaInfo.schemaRef,
      schema: schemaInfo.schema,
      examples: normalizeExamples(resolved.examples, resolved.example),
      content: resolved.content ? clone(resolved.content) : null,
    });
  });

  return groups;
}

function normalizeContent(spec, content) {
  return Object.entries(content || {}).map(([mediaType, media]) => {
    const schemaInfo = normalizeSchema(spec, media.schema || null);
    return {
      mediaType,
      schemaRef: schemaInfo.schemaRef,
      schema: schemaInfo.schema,
      examples: normalizeExamples(media.examples, media.example),
      encoding: media.encoding ? clone(media.encoding) : null,
    };
  });
}

function normalizeRequestBody(spec, requestBody) {
  if (!requestBody) {
    return null;
  }

  const resolved = dereference(spec, requestBody);
  return {
    required: Boolean(resolved.required),
    description: resolved.description || null,
    content: normalizeContent(spec, resolved.content),
  };
}

function normalizeHeaders(spec, headers) {
  return Object.entries(headers || {}).map(([name, header]) => {
    const resolved = dereference(spec, header);
    const schemaInfo = normalizeSchema(spec, resolved.schema || null);
    return {
      name,
      description: resolved.description || null,
      required: Boolean(resolved.required),
      schemaRef: schemaInfo.schemaRef,
      schema: schemaInfo.schema,
      examples: normalizeExamples(resolved.examples, resolved.example),
    };
  });
}

function normalizeLinks(spec, links) {
  return Object.entries(links || {}).map(([id, link]) => {
    const resolved = dereference(spec, link);
    return {
      id,
      operationId: resolved.operationId || null,
      operationRef: resolved.operationRef || null,
      description: resolved.description || null,
      parameters: resolved.parameters ? clone(resolved.parameters) : null,
      requestBody: resolved.requestBody ? clone(resolved.requestBody) : null,
      server: resolved.server ? clone(resolved.server) : null,
    };
  });
}

function normalizeResponses(spec, responses) {
  return Object.entries(responses || {}).map(([statusCode, response]) => {
    const resolved = dereference(spec, response);
    return {
      statusCode,
      description: resolved.description || null,
      headers: normalizeHeaders(spec, resolved.headers),
      content: normalizeContent(spec, resolved.content),
      links: normalizeLinks(spec, resolved.links),
    };
  });
}

function normalizeCallbacks(spec, callbacks) {
  return Object.entries(callbacks || {}).map(([id, callback]) => {
    const resolvedCallback = dereference(spec, callback);
    return {
      id,
      expressions: Object.entries(resolvedCallback || {}).map(([expression, pathItem]) => ({
        expression,
        operations: HTTP_METHODS.filter((method) => pathItem && pathItem[method]).map((method) => {
          const operation = pathItem[method];
          return {
            method,
            summary: operation.summary || null,
            description: operation.description || null,
            requestBody: normalizeRequestBody(spec, operation.requestBody),
            responses: normalizeResponses(spec, operation.responses),
          };
        }),
      })),
    };
  });
}

function normalizeSecurityRequirements(security) {
  return (security || []).map((requirement) => ({
    schemeIds: Object.keys(requirement),
    scopes: Object.values(requirement).flat(),
  }));
}

function normalizeServers(servers) {
  return (servers || []).map((server, index) => {
    const variables = Object.entries(server.variables || {}).map(([name, variable]) => ({
      name,
      description: variable.description || null,
      defaultValue: variable.default,
      enumValues: variable.enum || [],
    }));

    const defaultResolvedUrl = variables.reduce(
      (value, variable) => value.replace(new RegExp(`\\{${variable.name}\\}`, 'g'), String(variable.defaultValue)),
      server.url
    );

    return {
      id: server.description
        ? server.description.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : `server-${index + 1}`,
      urlTemplate: server.url,
      description: server.description || null,
      variables,
      defaultResolvedUrl,
    };
  });
}

function normalizeAuth(spec) {
  const schemes = Object.entries(spec.components?.securitySchemes || {}).map(([id, scheme]) => {
    const entry = {
      id,
      type: scheme.type,
      scheme: scheme.scheme || null,
      displayName: schemeDisplayName(id, scheme),
      description: scheme.description || null,
      location: null,
      scopes: [],
      flows: [],
      openIdConnectUrl: scheme.openIdConnectUrl || null,
    };

    if (scheme.type === 'http') {
      entry.location = { kind: 'header', name: 'Authorization' };
    }

    if (scheme.type === 'apiKey') {
      entry.location = { kind: scheme.in, name: scheme.name };
    }

    if (scheme.type === 'oauth2') {
      entry.flows = Object.entries(scheme.flows || {}).map(([flowName, flow]) => ({
        name: flowName,
        authorizationUrl: flow.authorizationUrl || null,
        tokenUrl: flow.tokenUrl || null,
        refreshUrl: flow.refreshUrl || null,
        scopes: Object.entries(flow.scopes || {}).map(([name, description]) => ({
          name,
          description,
        })),
      }));
      entry.scopes = entry.flows.flatMap((flow) => flow.scopes);
    }

    return entry;
  });

  const defaultSchemeId = spec.security && spec.security.length ? Object.keys(spec.security[0])[0] : schemes[0]?.id || null;

  return {
    schemes,
    defaultSchemeId,
  };
}

function schemeDisplayName(id, scheme) {
  if (scheme.type === 'http' && scheme.scheme === 'bearer') {
    return 'Bearer Authentication';
  }
  if (scheme.type === 'http' && scheme.scheme === 'basic') {
    return 'Basic Authentication';
  }
  if (scheme.type === 'apiKey') {
    return 'API Key Authentication';
  }
  if (scheme.type === 'oauth2') {
    return 'OAuth 2.0';
  }
  if (scheme.type === 'openIdConnect') {
    return 'OpenID Connect';
  }
  return id;
}

function normalizeTags(spec, operations) {
  const operationIdsByTag = operations.reduce((acc, operation) => {
    (operation.tags || []).forEach((tag) => {
      acc[tag] = acc[tag] || [];
      acc[tag].push(operation.id);
    });
    return acc;
  }, {});

  return (spec.tags || []).map((tag) => ({
    id: tag.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: tag.name,
    description: tag.description || null,
    externalDocs: tag.externalDocs
      ? {
          description: tag.externalDocs.description || null,
          url: tag.externalDocs.url || null,
        }
      : null,
    operationIds: operationIdsByTag[tag.name] || [],
  }));
}

function normalizeOperation(spec, pathKey, method, pathItem, operation) {
  const mergedParameters = [...(pathItem.parameters || []), ...(operation.parameters || [])];
  return {
    id: operation.operationId || `${method}:${pathKey}`,
    kind: 'path',
    path: pathKey,
    method,
    summary: operation.summary || null,
    description: operation.description || null,
    deprecated: Boolean(operation.deprecated),
    tags: operation.tags || [],
    externalDocs: operation.externalDocs
      ? {
          description: operation.externalDocs.description || null,
          url: operation.externalDocs.url || null,
        }
      : null,
    servers: normalizeServers(operation.servers || []),
    security: normalizeSecurityRequirements(
      operation.security !== undefined ? operation.security : spec.security
    ),
    parameters: normalizeParameters(spec, mergedParameters),
    requestBody: normalizeRequestBody(spec, operation.requestBody),
    responses: normalizeResponses(spec, operation.responses),
    callbacks: normalizeCallbacks(spec, operation.callbacks),
    links: normalizeResponses(spec, operation.responses).flatMap((response) => response.links),
    examples: {
      request: normalizeOperationRequestExamples(spec, operation),
      response: normalizeOperationResponseExamples(spec, operation.responses),
    },
  };
}

function normalizeOperationRequestExamples(spec, operation) {
  if (!operation.requestBody) {
    return [];
  }

  const requestBody = normalizeRequestBody(spec, operation.requestBody);
  return requestBody.content.flatMap((content) =>
    content.examples.map((example) => ({
      mediaType: content.mediaType,
      id: example.id,
      summary: example.summary,
      value: example.value,
    }))
  );
}

function normalizeOperationResponseExamples(spec, responses) {
  return normalizeResponses(spec, responses).flatMap((response) =>
    response.content.flatMap((content) =>
      content.examples.map((example) => ({
        statusCode: response.statusCode,
        mediaType: content.mediaType,
        id: example.id,
        summary: example.summary,
        value: example.value,
      }))
    )
  );
}

function normalizeOperations(spec) {
  return Object.entries(spec.paths || {}).flatMap(([pathKey, pathItem]) =>
    HTTP_METHODS.filter((method) => pathItem && pathItem[method]).map((method) =>
      normalizeOperation(spec, pathKey, method, pathItem, pathItem[method])
    )
  );
}

function normalizeWebhooks(spec) {
  return Object.entries(spec.webhooks || {}).flatMap(([name, pathItem]) =>
    HTTP_METHODS.filter((method) => pathItem && pathItem[method]).map((method) => {
      const operation = pathItem[method];
      return {
        id: operation.operationId || `${name}:${method}`,
        kind: 'webhook',
        name,
        method,
        summary: operation.summary || null,
        description: operation.description || null,
        tags: operation.tags || [],
        requestBody: normalizeRequestBody(spec, operation.requestBody),
        responses: normalizeResponses(spec, operation.responses),
      };
    })
  );
}

function normalizeComponentGroup(spec, groupName, kind) {
  return Object.entries(spec.components?.[groupName] || {}).map(([name, value]) => ({
    id: name,
    name,
    kind,
    sourceRef: `#/components/${groupName}/${name}`,
    description: value.description || null,
    schema: kind === 'schema' ? clone(value) : null,
    value: kind === 'schema' ? null : clone(dereference(spec, value)),
    examples: normalizeExamples(value.examples, value.example),
    usedBy: [],
  }));
}

function buildRenderModel(spec) {
  const operations = normalizeOperations(spec);

  return {
    meta: {
      title: spec.info?.title || null,
      summary: spec.info?.summary || null,
      description: spec.info?.description || null,
      version: spec.info?.version || null,
      termsOfService: spec.info?.termsOfService || null,
      contact: spec.info?.contact ? clone(spec.info.contact) : null,
      license: spec.info?.license ? clone(spec.info.license) : null,
      externalDocs: spec.externalDocs ? clone(spec.externalDocs) : null,
    },
    servers: normalizeServers(spec.servers || []),
    auth: normalizeAuth(spec),
    tags: normalizeTags(spec, operations),
    operations,
    webhooks: normalizeWebhooks(spec),
    components: {
      schemas: normalizeComponentGroup(spec, 'schemas', 'schema'),
      requestBodies: normalizeComponentGroup(spec, 'requestBodies', 'requestBody'),
      responses: normalizeComponentGroup(spec, 'responses', 'response'),
      parameters: normalizeComponentGroup(spec, 'parameters', 'parameter'),
      headers: normalizeComponentGroup(spec, 'headers', 'header'),
      examples: normalizeComponentGroup(spec, 'examples', 'example'),
      securitySchemes: normalizeComponentGroup(spec, 'securitySchemes', 'securityScheme'),
      links: normalizeComponentGroup(spec, 'links', 'link'),
      callbacks: normalizeComponentGroup(spec, 'callbacks', 'callback'),
    },
    download: {
      fileName: DOWNLOAD_FILE_NAME,
      sourceFormat: 'yaml',
      bundleStrategy: 'static-single-file',
      entrypoint: 'openapi/openapi.yaml',
      assetPath: DOWNLOAD_FILE_NAME,
    },
  };
}

function main() {
  const specSource = readSpecSource();
  const spec = readSpec();
  const model = buildRenderModel(spec);
  ensureOutputDir();
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(model, null, 2)}\n`, 'utf8');
  fs.writeFileSync(SOURCE_OUTPUT_PATH, specSource.endsWith('\n') ? specSource : `${specSource}\n`, 'utf8');
  console.log(`Wrote ${path.relative(ROOT, OUTPUT_PATH)}`);
  console.log(`Wrote ${path.relative(ROOT, SOURCE_OUTPUT_PATH)}`);
}

main();
