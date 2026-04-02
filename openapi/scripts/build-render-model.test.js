const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {writeRenderModel} = require('./build-render-model');

test('writes the render model and downloadable spec for a versioned spec', () => {
  const fixtureDir = fs.mkdtempSync(
    path.join(process.cwd(), 'tmp-build-render-model-'),
  );
  const specPath = path.join(fixtureDir, 'sample.yaml');
  const outputDir = path.join(fixtureDir, 'output');

  fs.writeFileSync(
    specPath,
    [
      'openapi: 3.1.0',
      'info:',
      '  title: Sample API',
      '  version: 1.2.3',
      'paths: {}',
      '',
    ].join('\n'),
  );

  writeRenderModel({specPath, outputDir});

  const renderModel = JSON.parse(
    fs.readFileSync(path.join(outputDir, 'render-model.json'), 'utf8'),
  );
  const sourceSpec = fs.readFileSync(
    path.join(outputDir, 'kairos.openapi.yaml'),
    'utf8',
  );

  assert.equal(renderModel.meta.title, 'Sample API');
  assert.equal(renderModel.meta.version, '1.2.3');
  assert.equal(
    renderModel.download.entrypoint,
    path.relative(process.cwd(), specPath).replace(/\\/gu, '/'),
  );
  assert.equal(renderModel.download.assetPath, 'kairos.openapi.yaml');
  assert.equal(sourceSpec, fs.readFileSync(specPath, 'utf8'));

  fs.rmSync(fixtureDir, {recursive: true, force: true});
});
