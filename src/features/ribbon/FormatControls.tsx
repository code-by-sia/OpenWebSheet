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

const alignments = [
  {icon: 'fa fa-align-left', label: 'Align left', value: 'left', textAlign: TextAlign.Left},
  {icon: 'fa fa-align-center', label: 'Align center', value: 'center', textAlign: TextAlign.Center},
  {icon: 'fa fa-align-right', label: 'Align right', value: 'right', textAlign: TextAlign.Right},
];

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
        alignments.map((alignment) => React.createElement(AlignButton, {
          action,
          alignment,
          appearance: props.appearance,
          key: alignment.value,
        })),
      ),
    ),
  );
}

function AlignButton({action, alignment, appearance}: any) {
  return React.createElement(Button, {
    active: appearance.textAlign === alignment.textAlign,
    icon: alignment.icon,
    onClick: () => action('align', alignment.value),
    title: alignment.label,
  });
}
