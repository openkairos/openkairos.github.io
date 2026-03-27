import {useEffect, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const {resolveVersionSwitchTarget} = require('@site/scripts/resolve-version-switch-target');

export const useVersionSwitchTargets = ({versions}) => {
  const {pathname} = useLocation();
  const manifestUrl = useBaseUrl('/docs/doc-paths.json');
  const {siteConfig} = useDocusaurusContext();
  const {defaultBranch, docsSiteBase, versionFallbackDocPath} =
    siteConfig.customFields;
  const [manifest, setManifest] = useState({});

  useEffect(() => {
    let cancelled = false;

    fetch(manifestUrl)
      .then((response) => (response.ok ? response.json() : {}))
      .then((loadedManifest) => {
        if (!cancelled) {
          setManifest(loadedManifest);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setManifest({});
        }
      });

    return () => {
      cancelled = true;
    };
  }, [manifestUrl]);

  return versions.map((version) => ({
    label: version,
    to: resolveVersionSwitchTarget({
      availableDocPathsByVersion: manifest,
      currentPathname: pathname,
      defaultBranch,
      docsSiteBase,
      fallbackDocPath: versionFallbackDocPath,
      targetVersion: version,
    }),
  }));
};
