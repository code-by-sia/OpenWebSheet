import React from 'react';

interface FieldProps {
  children?: React.ReactNode;
  label?: string;
}

export function Field(props: FieldProps) {
  return React.createElement(
    'label',
    {className: 'ows-field'},
    props.label && React.createElement('span', null, props.label),
    props.children,
  );
}
