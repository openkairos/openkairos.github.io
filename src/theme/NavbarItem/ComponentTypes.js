import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import VersionedApiReferenceNavbarItem from '@site/src/components/navbar/VersionedApiReferenceNavbarItem';
import VersionSwitcherDropdown from '@site/src/components/version-switcher/VersionSwitcherDropdown';

export default {
  ...ComponentTypes,
  'custom-api-reference-link': VersionedApiReferenceNavbarItem,
  'custom-version-switcher': VersionSwitcherDropdown,
};
