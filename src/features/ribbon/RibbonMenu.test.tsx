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

  it('switches tabs and renders the migrated tab content', () => {
    renderRibbon();

    fireEvent.click(screen.getByText('Formulas'));
    expect(screen.getByText('Mathematical')).toBeInTheDocument();
    expect(screen.getByText('User Defined Functions')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Data'));
    expect(screen.getByText('Open Office')).toBeInTheDocument();
    expect(screen.getByText('MS Excel')).toBeInTheDocument();

    fireEvent.click(screen.getByText('View'));
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('Layout')).toBeInTheDocument();

    fireEvent.click(screen.getByText('About'));

    expect(screen.getByText('Open Web Sheet Project')).toBeInTheDocument();
    expect(screen.getByText('Source Code')).toBeInTheDocument();
  });

  it('restores the home border actions', () => {
    const onAction = renderRibbon();

    fireEvent.click(screen.getByTitle('Outside borders'));

    expect(onAction).toHaveBeenCalledWith({actionName: 'outside-border', args: '#000000'});
  });
});
