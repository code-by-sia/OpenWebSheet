import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Shared/Tabs',
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => React.createElement('div', {className: 'bg-white p-6'},
    React.createElement(Tabs, {defaultValue: 'home'},
      React.createElement(TabsList, null,
        React.createElement(TabsTrigger, {value: 'home'}, 'Home'),
        React.createElement(TabsTrigger, {value: 'view'}, 'View'),
      ),
      React.createElement(TabsContent, {value: 'home'}, 'Home content'),
      React.createElement(TabsContent, {value: 'view'}, 'View content'),
    ),
  ),
};
