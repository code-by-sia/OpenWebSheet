import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Appearance } from '@/lib/core/Appearance';
import { RibbonMenu } from './RibbonMenu';

describe('RibbonMenu', () => {
  function renderRibbon(onAction = vi.fn()) {
    render(React.createElement(RibbonMenu, {
      appearance: new Appearance(),
      fileMode: 'file',
      onAction,
      onModeChanged: vi.fn(),
      state: {isMerged: false, label: 'A1', originalValue: '', value: ''},
    }));

    return onAction;
  }

  function selectTab(label: string) {
    fireEvent.mouseDown(screen.getByText(label), {button: 0, ctrlKey: false});
  }

  it('switches tabs and renders the migrated tab content', async () => {
    renderRibbon();

    selectTab('Formulas');
    expect(await screen.findByText('Mathematical')).toBeInTheDocument();
    expect(screen.getByText('User Defined Functions')).toBeInTheDocument();

    selectTab('Data');
    expect(await screen.findByText('Open Office')).toBeInTheDocument();
    expect(screen.getByText('MS Excel')).toBeInTheDocument();

    selectTab('View');
    expect(await screen.findByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Layout')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('Page layout')).toBeInTheDocument();
    expect(screen.getByText('Gridlines')).toBeInTheDocument();

    selectTab('About');

    expect(await screen.findByText('Open Web Sheet Project')).toBeInTheDocument();
    expect(screen.getByText('Source Code')).toBeInTheDocument();
  });

  it('restores the home border actions', () => {
    const onAction = renderRibbon();

    fireEvent.click(screen.getByTitle('Outside borders'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'outside-border', args: '#000000'});
  });

  it('toggles view layout section items', async () => {
    renderRibbon();

    selectTab('View');
    const headings = await screen.findByText('Headings');
    expect(headings.closest('button')).toHaveClass('ows-button-active');

    fireEvent.click(headings);

    expect(headings.closest('button')).not.toHaveClass('ows-button-active');
  });
});
