import React from 'react';
import { ControlGroup } from '@/shared/ui/ControlGroup';

export function AboutRibbon() {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(ControlGroup, {label: 'OSI'},
      React.createElement('i', {className: 'fab fa-osi ows-large-icon', title: 'Open Source Initiative'}),
    ),
    React.createElement(ControlGroup, {label: 'About Open Web Sheet Project', wide: true},
      React.createElement('div', {className: 'ows-about'},
        React.createElement('strong', null, 'Open Web Sheet Project'),
        React.createElement('span', null, 'Designed and developed by Siamand'),
        React.createElement('span', null, '3rd Parties: FontAwesome Icons & Google noto web font'),
        React.createElement('span', null, 'MIT Licence'),
        React.createElement('div', {className: 'ows-button-row'},
          React.createElement('a', {href: 'https://siamand.cc'}, 'Developer Site'),
          React.createElement('a', {href: 'https://github.com/code-by-sia/OpenWebSheet'}, 'Source Code'),
        ),
      ),
    ),
  );
}
