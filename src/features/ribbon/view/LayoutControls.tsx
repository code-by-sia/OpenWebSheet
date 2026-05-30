import React from 'react';
import { Button } from '@/shared/ui/Button';
import { ControlGroup } from '@/shared/ui/ControlGroup';

const layoutModes = [
  {id: 'normal', icon: 'fa fa-table', label: 'Normal'},
  {id: 'page-layout', icon: 'far fa-file-alt', label: 'Page layout'},
  {id: 'page-break', icon: 'fa fa-columns', label: 'Page break'},
];

const displayOptions = [
  {id: 'gridlines', icon: 'fa fa-th', label: 'Gridlines'},
  {id: 'headings', icon: 'fa fa-heading', label: 'Headings'},
  {id: 'formula-bar', icon: 'fa fa-equals', label: 'Formula bar'},
];

export function LayoutControls() {
  const [activeMode, setActiveMode] = React.useState('normal');
  const [enabled, setEnabled] = React.useState(() => new Set(displayOptions.map((item) => item.id)));

  const toggleOption = (id: string) => {
    const next = new Set(enabled);
    next.has(id) ? next.delete(id) : next.add(id);
    setEnabled(next);
  };

  return React.createElement(
    ControlGroup,
    {label: 'Layout', wide: true},
    React.createElement('div', {className: 'ows-layout-controls'},
      React.createElement('div', {className: 'ows-button-row'},
        layoutModes.map((item) => React.createElement(Button, {
          active: activeMode === item.id,
          icon: item.icon,
          key: item.id,
          onClick: () => setActiveMode(item.id),
          title: item.label,
        }, item.label)),
      ),
      React.createElement('div', {className: 'ows-button-row'},
        displayOptions.map((item) => React.createElement(Button, {
          active: enabled.has(item.id),
          icon: item.icon,
          key: item.id,
          onClick: () => toggleOption(item.id),
          title: item.label,
        }, item.label)),
      ),
    ),
  );
}
