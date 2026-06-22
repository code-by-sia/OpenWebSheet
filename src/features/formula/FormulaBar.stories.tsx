import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { FormulaBar } from './FormulaBar';

const meta: Meta<typeof FormulaBar> = {
  title: 'Features/FormulaBar',
  component: FormulaBar,
};

export default meta;

type Story = StoryObj<typeof FormulaBar>;

export const EditingFormula: Story = {
  render: () => React.createElement('div', {className: 'bg-white p-6'},
    React.createElement(FormulaBar, {
      label: 'C7',
      onAbort: () => undefined,
      onCommit: () => undefined,
      onValueChange: () => undefined,
      value: '=SUM(A1:B6)',
    }),
  ),
};
