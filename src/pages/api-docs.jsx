import {Redirect} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ApiDocs() {
  const {siteConfig} = useDocusaurusContext();
  const apiReferencePath =
    siteConfig.customFields.latestVersionedPagePaths['api-reference'];

  return <Redirect to={apiReferencePath} />;
}
