import React from 'react';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import {useVersionSwitchTargets} from '@site/src/components/version-switcher/useVersionSwitchTargets';

export default function VersionSwitcherDropdown({
  currentVersion,
  position = 'right',
  versions,
}) {
  const items = useVersionSwitchTargets({versions});

  return (
    <DropdownNavbarItem
      label={`Version: ${currentVersion}`}
      position={position}
      items={items}
    />
  );
}
