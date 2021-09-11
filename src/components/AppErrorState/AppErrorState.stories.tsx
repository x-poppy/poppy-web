import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AppErrorState } from './AppErrorState';

const Template: ComponentStory<typeof AppErrorState> = (args) => <AppErrorState {...args} />;

export default {
  title: `Component/${AppErrorState.name}`,
  component: AppErrorState,
} as ComponentMeta<typeof AppErrorState>;

export const Default = Template.bind({});
Default.args = {
  // state: undefined
};
