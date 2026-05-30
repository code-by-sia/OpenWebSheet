import React from 'react';
import { RibbonProps } from '@/app/types';
import { AboutRibbon } from './AboutRibbon';
import { DataRibbon } from './DataRibbon';
import { FormulaRibbon } from './FormulaRibbon';
import { HomeRibbon } from './HomeRibbon';
import { RibbonTab, RibbonTabs } from './RibbonTabs';
import { ViewRibbon } from './ViewRibbon';

const tabs: RibbonTab[] = [
  {id: 'home', label: 'Home'},
  {id: 'formulas', label: 'Formulas'},
  {id: 'data', label: 'Data'},
  {id: 'view', label: 'View'},
  {id: 'about', label: 'About'},
];

export function RibbonMenu(props: RibbonProps) {
  const [active, setActive] = React.useState('home');

  const content = active === 'home'
    ? React.createElement(HomeRibbon, props)
    : active === 'formulas'
      ? React.createElement(FormulaRibbon)
      : active === 'data'
        ? React.createElement(DataRibbon)
        : active === 'view'
          ? React.createElement(ViewRibbon)
          : React.createElement(AboutRibbon);

  return React.createElement(
    'header',
    {className: 'ows-ribbon'},
    React.createElement(RibbonTabs, {active, onChange: setActive, tabs}),
    content,
  );
}
