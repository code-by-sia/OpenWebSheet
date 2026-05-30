import React from 'react';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';

export function PrintControls() {
  return React.createElement(
    ControlGroup,
    {label: 'Print'},
    React.createElement(Button, {
      icon: 'fa fa-print',
      onClick: () => window.print(),
      title: 'Print sheet',
    }),
  );
}
