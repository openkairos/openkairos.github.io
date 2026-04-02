import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const trimSlashes = (value) => value.replace(/^\/+|\/+$/g, '');

const buildDocsContentPath = ({version, docPath}) =>
  `/${trimSlashes(version.routeBasePath)}/${trimSlashes(docPath)}`;

const buildVersionedPagePath = ({version, pageSlug}) =>
  `/${trimSlashes(version.routeBasePath)}/${trimSlashes(pageSlug)}`;

const parseCurrentVersion = ({currentPathname, versions, latestVersion}) => {
  const normalizedPath = trimSlashes(currentPathname);
  const matchedVersion = versions.find(({routeBasePath}) =>
    normalizedPath === trimSlashes(routeBasePath) ||
    normalizedPath.startsWith(`${trimSlashes(routeBasePath)}/`),
  );

  return matchedVersion ?? versions.find(({slug}) => slug === latestVersion) ?? versions[0];
};

const parseCurrentDocPath = ({currentPathname, currentVersion}) => {
  const normalizedPath = trimSlashes(currentPathname);
  const normalizedRouteBasePath = trimSlashes(currentVersion.routeBasePath);

  if (
    normalizedPath !== normalizedRouteBasePath &&
    !normalizedPath.startsWith(`${normalizedRouteBasePath}/`)
  ) {
    return null;
  }

  return trimSlashes(normalizedPath.slice(normalizedRouteBasePath.length)) || null;
};

const parseCurrentVersionedPage = ({
  currentPathname,
  currentVersion,
  versionedPages,
}) => {
  const currentDocPath = parseCurrentDocPath({
    currentPathname,
    currentVersion,
  });

  if (!currentDocPath) {
    return null;
  }

  return versionedPages.find(({slug}) => slug === currentDocPath) ?? null;
};

const resolveVersionSwitchTarget = ({
  availableDocPathsByVersion,
  currentPathname,
  currentVersion,
  targetVersion,
  versionedPages,
}) => {
  const currentVersionedPage = parseCurrentVersionedPage({
    currentPathname,
    currentVersion,
    versionedPages,
  });

  if (currentVersionedPage) {
    return buildVersionedPagePath({
      version: targetVersion,
      pageSlug: currentVersionedPage.slug,
    });
  }

  const currentDocPath = parseCurrentDocPath({
    currentPathname,
    currentVersion,
  });
  const targetDocPaths = new Set(availableDocPathsByVersion[targetVersion.slug] ?? []);
  const targetDocPath =
    currentDocPath && targetDocPaths.has(currentDocPath)
      ? currentDocPath
      : trimSlashes(targetVersion.fallbackDocId);

  return buildDocsContentPath({
    version: targetVersion,
    docPath: targetDocPath,
  });
};

export const useVersionSwitchTargets = () => {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {versions, latestVersion, docPathManifest, versionedPages} =
    siteConfig.customFields;
  const currentVersion = parseCurrentVersion({
    currentPathname: pathname,
    versions,
    latestVersion,
  });

  return {
    currentVersion: currentVersion.label,
    items: versions.map((version) => ({
      href: resolveVersionSwitchTarget({
        availableDocPathsByVersion: docPathManifest,
        currentPathname: pathname,
        currentVersion,
        targetVersion: version,
        versionedPages,
      }),
      label: version.label,
    })),
  };
};
