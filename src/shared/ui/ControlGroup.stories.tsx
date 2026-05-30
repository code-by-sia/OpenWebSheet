import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './Button';
import { ControlGroup } from './ControlGroup';

const meta: Meta<typeof ControlGroup> = {
  title: 'Shared/ControlGroup',
  component: ControlGroup,
};

export default meta;

type Story = StoryObj<typeof ControlGroup>;

export const ToolbarGroup: Story = {
  render: () => React.createElement('div', {className: 'flex gap-3 bg-white p-6'},
    React.createElement(ControlGroup, {label: 'Document'},
      React.createElement('div', {className: 'ows-button-row'},
        React.createElement(Button, {icon: 'fa fa-save', title: 'Save'}),
        React.createElement(Button, {icon: 'fa fa-folder', title: 'Open'}),
      ),
    ),
    React.createElement(ControlGroup, {label: 'Layout', wide: true},
      React.createElement('span', {className: 'ows-muted'}, 'Wide control group content'),
    ),
  ),
};
