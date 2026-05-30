import React from 'react';

interface FormulaBarProps {
  label: string;
  onAbort: () => void;
  onCommit: () => void;
  onValueChange: (value: string) => void;
  value: string;
}

export function FormulaBar(props: FormulaBarProps) {
  const [active, setActive] = React.useState(false);

  return React.createElement(
    'div',
    {className: active ? 'ows-formula-bar ows-formula-active' : 'ows-formula-bar'},
    React.createElement('input', {className: 'ows-cell-name', readOnly: true, value: props.label}),
    React.createElement(
      'div',
      {className: 'ows-formula-actions'},
      React.createElement('button', {onClick: props.onAbort, title: 'Cancel', type: 'button'}, 'x'),
      React.createElement('button', {onClick: props.onCommit, title: 'Apply', type: 'button'}, '✓'),
      React.createElement('strong', null, 'fx'),
    ),
    React.createElement('input', {
      className: 'ows-formula-input',
      onBlur: () => setActive(false),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => props.onValueChange(event.target.value),
      onFocus: () => setActive(true),
      value: props.value || '',
    }),
  );
}
