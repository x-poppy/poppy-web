import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeadMenuBar } from './HeadMenuBar';

const Template: ComponentStory<typeof HeadMenuBar> = (args) => <HeadMenuBar {...args} />;

export default {
  title: 'Widget/HeadMenuBar',
  component: HeadMenuBar,
  argTypes: {},
} as ComponentMeta<typeof HeadMenuBar>;

export const Default = Template.bind({});
// Default.args = { background: '#ff0', label: 'Button' };
