import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppEmptyState } from './AppEmptyState';

const Template: ComponentStory<typeof AppEmptyState> = (args) => <AppEmptyState {...args} />;

export default {
  title: `Component/${AppEmptyState.name}`,
  component: AppEmptyState,
} as ComponentMeta<typeof AppEmptyState>;

export const Default = Template.bind({});
Default.args = {
  expired: true,
  error: false,
  disabled: false,
};
