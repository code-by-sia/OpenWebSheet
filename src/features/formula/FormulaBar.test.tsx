import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormulaBar } from './FormulaBar';

describe('FormulaBar', () => {
  it('emits value changes and commit actions', () => {
    const onAbort = vi.fn();
    const onCommit = vi.fn();
    const onValueChange = vi.fn();

    render(React.createElement(FormulaBar, {
      label: 'A1',
      onAbort,
      onCommit,
      onValueChange,
      value: '=SUM(A1:A2)',
    }));

    fireEvent.change(screen.getByDisplayValue('=SUM(A1:A2)'), {
      target: {value: '=A1'},
    });
    fireEvent.click(screen.getByTitle('Apply'));

    expect(onValueChange).toHaveBeenCalledWith('=A1');
    expect(onCommit).toHaveBeenCalled();
    expect(onAbort).not.toHaveBeenCalled();
  });
});
