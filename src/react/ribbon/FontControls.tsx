import React from 'react';
import { Appearance } from '@/lib/core/Appearance';
import { AppAction } from '../types';
import { Button } from '../ui/Button';
import { ControlGroup } from '../ui/ControlGroup';
import { Field } from '../ui/Field';

const fonts = ['Arial', 'Tahoma', 'Times New Roman', 'Courier New'];
const sizes = [8, 9, 10, 11, 12, 14, 16, 18, 24];

interface FontControlsProps {
  appearance: Appearance;
  onAction: (action: AppAction) => void;
}

export function FontControls(props: FontControlsProps) {
  const action = (actionName: string, args?: any) => props.onAction({actionName, args});

  return React.createElement(
    ControlGroup,
    {label: 'Font'},
    React.createElement('div', {className: 'ows-stack'},
      React.createElement('div', {className: 'ows-button-row'},
        React.createElement(Field, null, React.createElement('select', {
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) => action('font-name', event.target.value),
          value: props.appearance.fontName,
        }, fonts.map((font) => React.createElement('option', {key: font}, font)))),
        React.createElement(Field, null, React.createElement('select', {
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) => action('font-size', Number(event.target.value)),
          value: props.appearance.fontSize,
        }, sizes.map((size) => React.createElement('option', {key: size}, size)))),
      ),
      React.createElement('div', {className: 'ows-button-row'},
        React.createElement(Button, {active: props.appearance.bold, icon: 'fa fa-bold', onClick: () => action('bold')}),
        React.createElement(Button, {
          active: props.appearance.italic,
          icon: 'fa fa-italic',
          onClick: () => action('italic'),
        }),
        React.createElement(Button, {
          active: props.appearance.underline,
          icon: 'fa fa-underline',
          onClick: () => action('underline'),
        }),
      ),
    ),
  );
}
