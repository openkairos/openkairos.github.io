import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const trimSlashes = (value) => value.replace(/^\/+|\/+$/g, '');

const resolveCurrentVersion = ({pathname, versions, latestVersion}) => {
  const normalizedPath = trimSlashes(pathname);
  const matchedVersion = versions.find(({routeBasePath}) => {
    const normalizedRouteBasePath = trimSlashes(routeBasePath);

    return (
      normalizedPath === normalizedRouteBasePath ||
      normalizedPath.startsWith(`${normalizedRouteBasePath}/`)
    );
  });

  return matchedVersion ?? versions.find(({slug}) => slug === latestVersion) ?? null;
};

export default function VersionedApiReferenceNavbarItem({position = 'right'}) {
  const {pathname} = useLocation();
  const {siteConfig} = useDocusaurusContext();
  const {versions, latestVersion} = siteConfig.customFields;
  const currentVersion = resolveCurrentVersion({
    pathname,
    versions,
    latestVersion,
  });

  if (!currentVersion) {
    return null;
  }

  const normalizedPath = trimSlashes(pathname);
  const normalizedRouteBasePath = trimSlashes(currentVersion.routeBasePath);

  if (
    normalizedPath !== normalizedRouteBasePath &&
    !normalizedPath.startsWith(`${normalizedRouteBasePath}/`)
  ) {
    return null;
  }

  return (
    <DefaultNavbarItem
      label='API Reference'
      position={position}
      to={`/${normalizedRouteBasePath}/api-reference`}
    />
  );
}
