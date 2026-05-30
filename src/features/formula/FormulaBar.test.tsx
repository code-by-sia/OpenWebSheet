import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormulaBar } from './FormulaBar';

describe('FormulaBar', () => {
  it('emits value changes and commit actions', () => {
    const onAbort = jest.fn();
    const onCommit = jest.fn();
    const onValueChange = jest.fn();

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

  it('emits abort actions and marks the bar active while editing', () => {
    const onAbort = jest.fn();

    render(React.createElement(FormulaBar, {
      label: 'B2',
      onAbort,
      onCommit: jest.fn(),
      onValueChange: jest.fn(),
      value: '42',
    }));

    const formulaInput = screen.getByDisplayValue('42');
    fireEvent.focus(formulaInput);
    expect(formulaInput.closest('.ows-formula-bar')).toHaveClass('ows-formula-active');

    fireEvent.click(screen.getByTitle('Cancel'));

    expect(onAbort).toHaveBeenCalledTimes(1);
  });
});
