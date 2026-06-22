import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';
import { ControlGroup } from './ControlGroup';
import { Field } from './Field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

describe('shared UI components', () => {
  it('renders button state, icon, title fallback, and click handler', () => {
    const onClick = jest.fn();

    render(React.createElement(Button, {
      active: true,
      icon: 'fa fa-save',
      label: 'Save workbook',
      onClick,
    }, 'Save'));

    const button = screen.getByRole('button', {name: 'Save'});
    expect(button).toHaveClass('ows-button-active');
    expect(button).toHaveAttribute('title', 'Save workbook');
    expect(button.querySelector('i')).toHaveClass('fa-save');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('marks wide control groups and renders their label', () => {
    render(React.createElement(ControlGroup, {label: 'Layout', wide: true}, 'Controls'));

    expect(screen.getByText('Layout')).toBeInTheDocument();
    expect(screen.getByText('Layout').closest('section')).toHaveClass('ows-control-group-wide');
  });

  it('associates field labels with nested form controls', () => {
    render(React.createElement(Field, {label: 'Font size'},
      React.createElement('input', {defaultValue: '12'}),
    ));

    expect(screen.getByLabelText('Font size')).toHaveValue('12');
  });

  it('switches tab content through the shared tabs wrapper', () => {
    render(React.createElement(Tabs, {defaultValue: 'home'},
      React.createElement(TabsList, null,
        React.createElement(TabsTrigger, {value: 'home'}, 'Home'),
        React.createElement(TabsTrigger, {value: 'view'}, 'View'),
      ),
      React.createElement(TabsContent, {value: 'home'}, 'Home content'),
      React.createElement(TabsContent, {value: 'view'}, 'View content'),
    ));

    expect(screen.getByText('Home content')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByText('View'), {button: 0, ctrlKey: false});

    expect(screen.getByText('View content')).toBeInTheDocument();
  });
});
