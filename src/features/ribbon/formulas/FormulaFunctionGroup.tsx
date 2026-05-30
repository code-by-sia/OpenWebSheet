import React from 'react';
import { AppAction } from '@/app/types';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';

interface FormulaAction {
  icon: string;
  label: string;
  template: string;
}

interface FormulaFunctionGroupProps {
  functions: FormulaAction[];
  label: string;
  onAction: (action: AppAction) => void;
}

export function FormulaFunctionGroup(props: FormulaFunctionGroupProps) {
  return React.createElement(
    ControlGroup,
    {label: props.label, wide: true},
    React.createElement('div', {className: 'ows-formula-tools'},
      props.functions.map((formula) => React.createElement(Button, {
        icon: formula.icon,
        key: formula.label,
        onClick: () => props.onAction({actionName: 'formula-template', args: formula.template}),
        title: `Insert ${formula.label}`,
      }, formula.label)),
    ),
  );
}
