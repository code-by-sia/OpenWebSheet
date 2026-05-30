import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Appearance, TextAlign } from '@/lib/core/Appearance';
import { BorderControls } from './BorderControls';
import { CellControls } from './CellControls';
import { DocumentControls } from './DocumentControls';
import { FontControls } from './FontControls';
import { FormatControls } from './FormatControls';
import { FormulaRibbon } from './FormulaRibbon';
import { ViewRibbon } from './ViewRibbon';

const meta: Meta = {
  title: 'Features/Ribbon Controls',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj;

const action = () => undefined;

function activeAppearance() {
  const appearance = new Appearance();
  appearance.background = '#fef3c7';
  appearance.fontName = 'Arial';
  appearance.fontSize = 14;
  appearance.text = '#111827';
  appearance.textAlign = TextAlign.Center;
  appearance.bold = true;
  return appearance;
}

export const HomeGroups: Story = {
  render: () => React.createElement('div', {className: 'ows-ribbon-panel'},
    React.createElement(DocumentControls, {fileMode: 'file', onAction: action, onModeChanged: action}),
    React.createElement(FontControls, {appearance: activeAppearance(), onAction: action}),
    React.createElement(FormatControls, {appearance: activeAppearance(), onAction: action}),
    React.createElement(CellControls, {
      onAction: action,
      state: {isMerged: true, label: 'B2', originalValue: '', value: ''},
    }),
    React.createElement(BorderControls, {onAction: action}),
  ),
};

export const LocalDocumentMode: Story = {
  render: () => React.createElement('div', {className: 'ows-ribbon-panel'},
    React.createElement(DocumentControls, {fileMode: 'local', onAction: action, onModeChanged: action}),
  ),
};

export const FormulaGroups: Story = {
  render: () => React.createElement(FormulaRibbon, {onAction: action}),
};

export const ViewGroups: Story = {
  render: () => React.createElement(ViewRibbon),
};
