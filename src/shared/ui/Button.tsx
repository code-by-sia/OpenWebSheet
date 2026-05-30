import React from 'react';

interface ButtonProps {
  active?: boolean;
  children?: React.ReactNode;
  icon?: string;
  label?: string;
  onClick?: () => void;
  title?: string;
}

export function Button(props: ButtonProps) {
  const className = props.active ? 'ows-button ows-button-active' : 'ows-button';

  return React.createElement(
    'button',
    {
      className,
      onClick: props.onClick,
      title: props.title || props.label,
      type: 'button',
    },
    props.icon && React.createElement('i', {className: props.icon}),
    props.children,
  );
}
