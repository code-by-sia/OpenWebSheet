import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

interface TabsProps {
  children?: React.ReactNode;
  defaultValue: string;
}

interface TabsValueProps {
  children?: React.ReactNode;
  value: string;
}

export function Tabs(props: TabsProps) {
  return React.createElement(TabsPrimitive.Root, {
    className: 'ows-tabs',
    defaultValue: props.defaultValue,
  }, props.children);
}

export function TabsList(props: {children?: React.ReactNode}) {
  return React.createElement(TabsPrimitive.List, {className: 'ows-tabs-list'}, props.children);
}

export function TabsTrigger(props: TabsValueProps) {
  return React.createElement(
    TabsPrimitive.Trigger,
    {className: 'ows-tabs-trigger', value: props.value},
    props.children,
  );
}

export function TabsContent(props: TabsValueProps) {
  return React.createElement(
    TabsPrimitive.Content,
    {className: 'ows-tabs-content', value: props.value},
    props.children,
  );
}
