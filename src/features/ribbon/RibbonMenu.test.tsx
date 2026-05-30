import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Appearance } from '@/lib/core/Appearance';
import { RibbonMenu } from './RibbonMenu';

describe('RibbonMenu', () => {
  it('switches tabs and keeps the React ribbon mounted', () => {
    render(React.createElement(RibbonMenu, {
      appearance: new Appearance(),
      fileMode: 'file',
      onAction: vi.fn(),
      onModeChanged: vi.fn(),
      state: {isMerged: false, label: 'A1', originalValue: '', value: ''},
    }));

    fireEvent.click(screen.getByText('About'));

    expect(screen.getByText('Open Web Sheet Project')).toBeInTheDocument();
    expect(screen.getByText('Source Code')).toBeInTheDocument();
  });
});
