import React from 'react';
import { AppAction } from '@/app/types';
import { ControlGroup } from '@/shared/ui/ControlGroup';
import { Field } from '@/shared/ui/Field';

const borders = [
  ['full-border', 'all', 'All borders'],
  ['cross-border', 'inside', 'Inside borders'],
  ['horizontal-border', 'horizontal', 'Horizontal borders'],
  ['vertical-border', 'vertical', 'Vertical borders'],
  ['outside-border', 'outside', 'Outside borders'],
  ['left-border', 'left', 'Left border'],
  ['top-border', 'top', 'Top border'],
  ['right-border', 'right', 'Right border'],
  ['bottom-border', 'bottom', 'Bottom border'],
  ['no-border', 'none', 'No border'],
];

interface BorderControlsProps {
  onAction: (action: AppAction) => void;
}

export function BorderControls(props: BorderControlsProps) {
  const [borderColor, setBorderColor] = React.useState('#000000');
  const onBorder = (actionName: string) => props.onAction({actionName, args: borderColor});

  return React.createElement(
    ControlGroup,
    {label: 'Borders'},
    React.createElement('div', {className: 'ows-stack'},
      React.createElement(Field, {label: 'Color'}, React.createElement('input', {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => setBorderColor(event.target.value),
        type: 'color',
        value: borderColor,
      })),
      React.createElement('div', {className: 'ows-border-grid'},
        borders.map(([actionName, variant, label]) => React.createElement(BorderButton, {
          key: actionName,
          label,
          onClick: () => onBorder(actionName),
          variant,
        })),
      ),
    ),
  );
}

function BorderButton({label, onClick, variant}: any) {
  return React.createElement('button', {
    className: `ows-border-tile ows-border-${variant}`,
    onClick,
    title: label,
    type: 'button',
  }, React.createElement('span'), React.createElement('span'), React.createElement('span'), React.createElement('span'));
}
