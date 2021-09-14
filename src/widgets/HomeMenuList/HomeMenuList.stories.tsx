import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HomeMenuList } from './HomeMenuList';

const Template: ComponentStory<typeof HomeMenuList> = (args) => <HomeMenuList {...args} />;

export default {
  title: 'Widget/HomeMenuList',
  component: HomeMenuList,
  argTypes: {},
} as ComponentMeta<typeof HomeMenuList>;

export const Default = Template.bind({});
// Default.args = { background: '#ff0', label: 'Button' };
