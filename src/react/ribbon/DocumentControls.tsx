import React from 'react';
import { Button } from '../ui/Button';
import { ControlGroup } from '../ui/ControlGroup';
import { AppAction } from '../types';

interface DocumentControlsProps {
  fileMode: 'file' | 'local';
  onAction: (action: AppAction) => void;
  onModeChanged: (mode: 'file' | 'local') => void;
}

export function DocumentControls(props: DocumentControlsProps) {
  const action = (actionName: string) => props.onAction({actionName});

  if (props.fileMode === 'local') {
    return React.createElement(
      ControlGroup,
      {label: 'Local Storage'},
      React.createElement(Button, {
        icon: 'far fa-times-circle',
        onClick: () => props.onModeChanged('file'),
      }, 'File mode'),
    );
  }

  return React.createElement(
    ControlGroup,
    {label: 'Document'},
    React.createElement('div', {className: 'ows-button-row'},
      React.createElement(Button, {icon: 'fas fa-save', onClick: () => action('save-ows'), title: 'Save'}),
      React.createElement(Button, {icon: 'fas fa-folder', onClick: () => action('load-ows'), title: 'Load'}),
      React.createElement(Button, {
        icon: 'fas fa-warehouse',
        onClick: () => props.onModeChanged('local'),
        title: 'Local storage',
      }),
    ),
  );
}
