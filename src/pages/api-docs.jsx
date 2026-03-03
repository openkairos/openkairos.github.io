import Layout from '@theme/Layout';

export default function ApiDocs() {
  return (
      <Layout title='API Reference' description='API Reference Documentation'>
        <iframe
            src='/openapi'
            style={{
              width: '100%',
              height: '100vh',
              border: 'none',
            }}
            title='OpenAPI Documentation'
        />
      </Layout>
  );
}
