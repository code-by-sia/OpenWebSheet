import React from 'react';

export interface RibbonTab {
  id: string;
  label: string;
}

interface RibbonTabsProps {
  active: string;
  onChange: (id: string) => void;
  tabs: RibbonTab[];
}

export function RibbonTabs(props: RibbonTabsProps) {
  return React.createElement(
    'nav',
    {className: 'ows-ribbon-tabs'},
    props.tabs.map((tab) => React.createElement(
      'button',
      {
        className: tab.id === props.active ? 'ows-ribbon-tab ows-ribbon-tab-active' : 'ows-ribbon-tab',
        key: tab.id,
        onClick: () => props.onChange(tab.id),
        type: 'button',
      },
      tab.label,
    )),
  );
}
