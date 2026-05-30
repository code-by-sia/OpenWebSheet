import React from 'react';
import { ControlGroup } from '../ui/ControlGroup';

interface PlaceholderRibbonProps {
  labels: string[];
}

export function PlaceholderRibbon(props: PlaceholderRibbonProps) {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    props.labels.map((label) => React.createElement(
      ControlGroup,
      {key: label, label, wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Reserved for migrated React controls'),
    )),
  );
}
