import React from 'react';
import { LayoutControls } from './view/LayoutControls';
import { PrintControls } from './view/PrintControls';

export function ViewRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(PrintControls),
    React.createElement(LayoutControls),
  );
}
