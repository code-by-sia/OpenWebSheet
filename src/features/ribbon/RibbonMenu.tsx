import React from 'react';
import { RibbonProps } from '@/app/types';
import { AboutRibbon } from './AboutRibbon';
import { DataRibbon } from './DataRibbon';
import { FormulaRibbon } from './FormulaRibbon';
import { HomeRibbon } from './HomeRibbon';
import { ViewRibbon } from './ViewRibbon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs';

const tabs = [
  {id: 'home', label: 'Home'},
  {id: 'formulas', label: 'Formulas'},
  {id: 'data', label: 'Data'},
  {id: 'view', label: 'View'},
  {id: 'about', label: 'About'},
];

export function RibbonMenu(props: RibbonProps) {
  return React.createElement(
    'header',
    {className: 'ows-ribbon'},
    React.createElement(Tabs, {defaultValue: 'home'},
      React.createElement(TabsList, null,
        tabs.map((tab) => React.createElement(TabsTrigger, {key: tab.id, value: tab.id}, tab.label)),
      ),
      React.createElement(TabsContent, {value: 'home'}, React.createElement(HomeRibbon, props)),
      React.createElement(TabsContent, {value: 'formulas'}, React.createElement(FormulaRibbon)),
      React.createElement(TabsContent, {value: 'data'}, React.createElement(DataRibbon)),
      React.createElement(TabsContent, {value: 'view'}, React.createElement(ViewRibbon)),
      React.createElement(TabsContent, {value: 'about'}, React.createElement(AboutRibbon)),
    ),
  );
}
