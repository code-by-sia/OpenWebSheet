import React from 'react';
import { AppAction, SheetState } from '../types';
import { Button } from '../ui/Button';
import { ControlGroup } from '../ui/ControlGroup';
import { Field } from '../ui/Field';

interface CellControlsProps {
  onAction: (action: AppAction) => void;
  state: SheetState;
}

export function CellControls(props: CellControlsProps) {
  const [borderColor, setBorderColor] = React.useState('#000000');
  const action = (actionName: string, args?: any) => props.onAction({actionName, args});

  return React.createElement(
    ControlGroup,
    {label: 'Cell'},
    React.createElement('div', {className: 'ows-stack'},
      React.createElement(Button, {
        active: props.state.isMerged,
        icon: 'fa fa-th',
        onClick: () => action(props.state.isMerged ? 'unmerge' : 'merge'),
      }, props.state.isMerged ? 'Split' : 'Merge'),
      React.createElement(Field, {label: 'Border'}, React.createElement('input', {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => setBorderColor(event.target.value),
        type: 'color',
        value: borderColor,
      })),
      React.createElement(Button, {onClick: () => action('full-border', borderColor)}, 'All borders'),
    ),
  );
}
