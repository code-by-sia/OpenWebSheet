import React from 'react';
import { RibbonProps } from '../types';
import { AboutRibbon } from './AboutRibbon';
import { HomeRibbon } from './HomeRibbon';
import { PlaceholderRibbon } from './PlaceholderRibbon';
import { RibbonTab, RibbonTabs } from './RibbonTabs';

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
    : active === 'about'
      ? React.createElement(AboutRibbon)
      : React.createElement(PlaceholderRibbon, {labels: [active]});

  return React.createElement(
    'header',
    {className: 'ows-ribbon'},
    React.createElement(RibbonTabs, {active, onChange: setActive, tabs}),
    content,
  );
}
