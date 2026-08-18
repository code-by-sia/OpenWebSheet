import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Shared/Field',
  component: Field,
};

export default meta;

type Story = StoryObj<typeof Field>;

export const FormFields: Story = {
  render: () => React.createElement('div', {className: 'ows-stack bg-white p-6'},
    React.createElement(Field, {label: 'Font'},
      React.createElement('select', {defaultValue: 'Arial'},
        React.createElement('option', null, 'Arial'),
        React.createElement('option', null, 'Courier New'),
      ),
    ),
    React.createElement(Field, {label: 'Fill'},
      React.createElement('input', {defaultValue: '#ffffff', type: 'color'}),
    ),
  ),
};
