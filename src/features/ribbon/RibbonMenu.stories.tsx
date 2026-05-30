import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Appearance } from '@/lib/core/Appearance';
import { RibbonMenu } from './RibbonMenu';

const meta: Meta<typeof RibbonMenu> = {
  title: 'Features/RibbonMenu',
  component: RibbonMenu,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof RibbonMenu>;

export const Default: Story = {
  render: () => React.createElement(RibbonMenu, {
    appearance: new Appearance(),
    fileMode: 'file',
    onAction: () => undefined,
    onModeChanged: () => undefined,
    state: {isMerged: false, label: 'A1', originalValue: '', value: ''},
  }),
};

export const LocalMergedCell: Story = {
  render: () => React.createElement(RibbonMenu, {
    appearance: new Appearance(),
    fileMode: 'local',
    onAction: () => undefined,
    onModeChanged: () => undefined,
    state: {isMerged: true, label: 'D4', originalValue: 'Merged', value: 'Merged'},
  }),
};
