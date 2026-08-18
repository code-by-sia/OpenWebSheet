import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Appearance } from '@/lib/core/Appearance';
import { BorderControls } from './BorderControls';
import { CellControls } from './CellControls';
import { DocumentControls } from './DocumentControls';
import { FontControls } from './FontControls';
import { FormatControls } from './FormatControls';
import { FormulaRibbon } from './FormulaRibbon';
import { LayoutControls } from './view/LayoutControls';
import { PrintControls } from './view/PrintControls';

describe('ribbon controls', () => {
  it('emits document actions and switches to local mode', () => {
    const onAction = jest.fn();
    const onModeChanged = jest.fn();

    render(React.createElement(DocumentControls, {fileMode: 'file', onAction, onModeChanged}));

    fireEvent.click(screen.getByTitle('Save'));
    fireEvent.click(screen.getByTitle('Load'));
    fireEvent.click(screen.getByTitle('Local storage'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'save-ows'});
    expect(onAction).toHaveBeenCalledWith({actionName: 'load-ows'});
    expect(onModeChanged).toHaveBeenCalledWith('local');
  });

  it('returns from local storage mode to file mode', () => {
    const onModeChanged = jest.fn();

    render(React.createElement(DocumentControls, {
      fileMode: 'local',
      onAction: jest.fn(),
      onModeChanged,
    }));

    fireEvent.click(screen.getByRole('button', {name: 'File mode'}));

    expect(onModeChanged).toHaveBeenCalledWith('file');
  });

  it('emits font and text style actions', () => {
    const appearance = new Appearance();
    appearance.fontName = 'Arial';
    const onAction = jest.fn();

    render(React.createElement(FontControls, {appearance, onAction}));

    fireEvent.change(screen.getByDisplayValue('Arial'), {target: {value: 'Courier New'}});
    fireEvent.change(screen.getByDisplayValue('12'), {target: {value: '18'}});
    fireEvent.click(screen.getByTitle('Bold'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'font-name', args: 'Courier New'});
    expect(onAction).toHaveBeenCalledWith({actionName: 'font-size', args: 18});
    expect(onAction).toHaveBeenCalledWith({actionName: 'bold', args: undefined});
  });

  it('emits color and alignment actions', () => {
    const appearance = new Appearance();
    appearance.text = '#111111';
    appearance.background = '#ffffff';
    const onAction = jest.fn();

    render(React.createElement(FormatControls, {appearance, onAction}));

    fireEvent.change(screen.getByLabelText('Text'), {target: {value: '#123456'}});
    fireEvent.change(screen.getByLabelText('Fill'), {target: {value: '#abcdef'}});
    fireEvent.click(screen.getByTitle('Align right'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'fg-color', args: '#123456'});
    expect(onAction).toHaveBeenCalledWith({actionName: 'bg-color', args: '#abcdef'});
    expect(onAction).toHaveBeenCalledWith({actionName: 'align', args: 'right'});
  });

  it('uses the selected border color for border commands', () => {
    const onAction = jest.fn();

    render(React.createElement(BorderControls, {onAction}));

    fireEvent.change(screen.getByLabelText('Color'), {target: {value: '#ff0000'}});
    fireEvent.click(screen.getByTitle('Bottom border'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'bottom-border', args: '#ff0000'});
  });

  it('emits merge and unmerge commands based on selection state', () => {
    const onAction = jest.fn();
    const state = {isMerged: false, label: 'A1', originalValue: '', value: ''};
    const {rerender} = render(React.createElement(CellControls, {onAction, state}));

    fireEvent.click(screen.getByRole('button', {name: 'Merge'}));
    rerender(React.createElement(CellControls, {onAction, state: {...state, isMerged: true}}));
    fireEvent.click(screen.getByRole('button', {name: 'Split'}));

    expect(onAction).toHaveBeenCalledWith({actionName: 'merge', args: undefined});
    expect(onAction).toHaveBeenCalledWith({actionName: 'unmerge', args: undefined});
  });

  it('triggers formula templates from each formulas group', () => {
    const onAction = jest.fn();

    render(React.createElement(FormulaRibbon, {onAction}));

    fireEvent.click(screen.getByTitle('Insert MAX'));
    fireEvent.click(screen.getByTitle('Insert EXP'));
    fireEvent.click(screen.getByTitle('Insert TAN'));
    fireEvent.click(screen.getByTitle('Insert PI'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'formula-template', args: '=MAX('});
    expect(onAction).toHaveBeenCalledWith({actionName: 'formula-template', args: '=EXP('});
    expect(onAction).toHaveBeenCalledWith({actionName: 'formula-template', args: '=TAN('});
    expect(onAction).toHaveBeenCalledWith({actionName: 'formula-template', args: '=PI'});
  });

  it('toggles layout mode and display options', () => {
    render(React.createElement(LayoutControls));

    fireEvent.click(screen.getByText('Page layout'));
    fireEvent.click(screen.getByText('Gridlines'));

    expect(screen.getByText('Page layout').closest('button')).toHaveClass('ows-button-active');
    expect(screen.getByText('Gridlines').closest('button')).not.toHaveClass('ows-button-active');
  });

  it('calls the browser print dialog from print controls', () => {
    const print = jest.spyOn(window, 'print').mockImplementation(() => undefined);

    render(React.createElement(PrintControls));
    fireEvent.click(screen.getByTitle('Print sheet'));

    expect(print).toHaveBeenCalledTimes(1);
    print.mockRestore();
  });
});
