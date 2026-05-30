import React from 'react';
import { ControlGroup } from '@/shared/ui/ControlGroup';

export function ViewRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(ControlGroup, {label: 'Print'},
      React.createElement('i', {className: 'fa fa-print ows-large-icon', title: 'Print'}),
    ),
    React.createElement(ControlGroup, {label: 'Layout', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Worksheet layout'),
    ),
  );
}
