import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ApiDocs() {
  const openApiUrl = useBaseUrl('/openapi/');

  return (
      <Layout title='API Reference' description='API Reference Documentation'>
        <iframe
            src={openApiUrl}
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
