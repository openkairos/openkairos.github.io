import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {useVersionSwitchTargets} from '@site/src/components/version-switcher/useVersionSwitchTargets';

export default function VersionSwitcherDropdown({position = 'right'}) {
  const {currentVersion, items} = useVersionSwitchTargets();

  return (
    <DropdownNavbarItem
      label={`Version: ${currentVersion}`}
      position={position}
      items={items}
    />
  );
}
