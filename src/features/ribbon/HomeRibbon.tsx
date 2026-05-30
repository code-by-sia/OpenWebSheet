import React from 'react';
import { RibbonProps } from '@/app/types';
import { CellControls } from './CellControls';
import { DocumentControls } from './DocumentControls';
import { FontControls } from './FontControls';
import { FormatControls } from './FormatControls';
import { BorderControls } from './BorderControls';

export function HomeRibbon(props: RibbonProps) {
  return React.createElement(
    'div',
    {className: 'ows-ribbon-panel'},
    React.createElement(DocumentControls, {
      fileMode: props.fileMode,
      onAction: props.onAction,
      onModeChanged: props.onModeChanged,
    }),
    React.createElement(FontControls, {appearance: props.appearance, onAction: props.onAction}),
    React.createElement(FormatControls, {appearance: props.appearance, onAction: props.onAction}),
    React.createElement(CellControls, {onAction: props.onAction, state: props.state}),
    React.createElement(BorderControls, {onAction: props.onAction}),
  );
}
