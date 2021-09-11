import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AppEmptyState } from './AppEmptyState';

const Template: ComponentStory<typeof AppEmptyState> = (args) => <AppEmptyState {...args} />;

export default {
  title: `Component/${AppEmptyState.name}`,
  component: AppEmptyState,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppEmptyState>;

export const Default = Template.bind({});
Default.args = { background: '#ff0', label: 'Button' };
