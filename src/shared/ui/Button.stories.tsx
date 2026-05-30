import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: () => React.createElement('div', {className: 'ows-button-row p-6'},
    React.createElement(Button, {icon: 'fa fa-save', title: 'Save'}, 'Save'),
    React.createElement(Button, {active: true, icon: 'fa fa-bold', title: 'Bold'}, 'Active'),
    React.createElement(Button, {icon: 'fa fa-print', title: 'Print'}, 'Print'),
  ),
};
