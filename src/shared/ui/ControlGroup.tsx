import React from 'react';

interface ControlGroupProps {
  children?: React.ReactNode;
  label: string;
  wide?: boolean;
}

export function ControlGroup(props: ControlGroupProps) {
  return React.createElement(
    'section',
    {className: props.wide ? 'ows-control-group ows-control-group-wide' : 'ows-control-group'},
    React.createElement('div', {className: 'ows-control-label'}, props.label),
    React.createElement('div', {className: 'ows-control-content'}, props.children),
  );
}
