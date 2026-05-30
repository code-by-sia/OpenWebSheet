import React from 'react';
import { ControlGroup } from '../ui/ControlGroup';

export function AboutRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(ControlGroup, {label: 'About', wide: true},
      React.createElement('div', {className: 'ows-about'},
        React.createElement('strong', null, 'Open Web Sheet Project'),
        React.createElement('span', null, 'MIT Licence'),
        React.createElement('a', {href: 'https://github.com/code-by-sia/OpenWebSheet'}, 'Source Code'),
      ),
    ),
  );
}
