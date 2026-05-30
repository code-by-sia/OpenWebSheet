import React from 'react';
import { Appearance, TextAlign } from '@/lib/core/Appearance';
import { AppAction } from '@/app/types';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';
import { Field } from '@/shared/ui/Field';

interface FormatControlsProps {
  appearance: Appearance;
  onAction: (action: AppAction) => void;
}

export function FormatControls(props: FormatControlsProps) {
  const action = (actionName: string, args?: any) => props.onAction({actionName, args});

  return React.createElement(
    ControlGroup,
    {label: 'Format'},
    React.createElement('div', {className: 'ows-stack'},
      React.createElement('div', {className: 'ows-button-row'},
        React.createElement(Field, {label: 'Text'}, React.createElement('input', {
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => action('fg-color', event.target.value),
          type: 'color',
          value: props.appearance.text,
        })),
        React.createElement(Field, {label: 'Fill'}, React.createElement('input', {
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => action('bg-color', event.target.value),
          type: 'color',
          value: props.appearance.background,
        })),
      ),
      React.createElement('div', {className: 'ows-button-row'},
        React.createElement(AlignButton, {action, alignment: TextAlign.Left, appearance: props.appearance}),
        React.createElement(AlignButton, {action, alignment: TextAlign.Center, appearance: props.appearance}),
        React.createElement(AlignButton, {action, alignment: TextAlign.Right, appearance: props.appearance}),
      ),
    ),
  );
}

function AlignButton({action, alignment, appearance}: any) {
  const icon = alignment === TextAlign.Left
    ? 'fa fa-align-left'
    : alignment === TextAlign.Center ? 'fa fa-align-center' : 'fa fa-align-right';

  return React.createElement(Button, {
    active: appearance.textAlign === alignment,
    icon,
    onClick: () => action('align', alignment),
  });
}
