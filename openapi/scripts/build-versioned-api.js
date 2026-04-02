const fs = require('fs');
const path = require('path');
const {execFileSync} = require('child_process');

const versions = require('../../versioned-docs/versions');
const {writeRenderModel} = require('./build-render-model');

const ROOT = path.resolve(__dirname, '..', '..');
const OPENAPI_DIR = path.join(ROOT, 'openapi');
const OUTPUT_ROOT = path.join(ROOT, 'static', 'openapi');
const TEMPLATE_DIR = path.join(OPENAPI_DIR, 'templates', 'kairos');

function resolveSpecPath(versionSlug) {
  return path.join(OPENAPI_DIR, `${versionSlug}.yaml`);
}

function resolveOutputDir(versionSlug) {
  return path.join(OUTPUT_ROOT, versionSlug);
}

function assertVersionedSpecsExist(versionSlugs) {
  versionSlugs.forEach((versionSlug) => {
    const specPath = resolveSpecPath(versionSlug);

    if (!fs.existsSync(specPath)) {
      throw new Error(`Missing OpenAPI spec for version "${versionSlug}" at ${specPath}.`);
    }
  });
}

function generateVersion(versionSlug) {
  const specPath = resolveSpecPath(versionSlug);
  const outputDir = resolveOutputDir(versionSlug);

  writeRenderModel({specPath, outputDir});
  execFileSync(
    'npx',
    [
      'openapi-generator-cli',
      'generate',
      '-g',
      'html2',
      '-i',
      specPath,
      '-o',
      outputDir,
      '-t',
      TEMPLATE_DIR,
    ],
    {stdio: 'inherit'},
  );
}

function buildVersionedApi() {
  const versionSlugs = versions.map(({version}) => version);

  assertVersionedSpecsExist(versionSlugs);
  fs.rmSync(OUTPUT_ROOT, {recursive: true, force: true});
  fs.mkdirSync(OUTPUT_ROOT, {recursive: true});
  versionSlugs.forEach(generateVersion);
}

if (require.main === module) {
  buildVersionedApi();
}

module.exports = {
  assertVersionedSpecsExist,
  resolveOutputDir,
  resolveSpecPath,
};
