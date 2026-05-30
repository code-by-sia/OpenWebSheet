import React from 'react';
import { ControlGroup } from '@/shared/ui/ControlGroup';

export function FormulaRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(ControlGroup, {label: 'Mathematical', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Function tools'),
    ),
    React.createElement(ControlGroup, {label: 'Statistics', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Analysis helpers'),
    ),
    React.createElement(ControlGroup, {label: 'User Defined Functions', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Custom formulas'),
    ),
  );
}
