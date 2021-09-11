import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeadMenuList } from './HeadMenuList';

const Template: ComponentStory<typeof HeadMenuList> = (args) => <HeadMenuList {...args} />;

export default {
  title: 'Widget/HeadMenuList',
  component: HeadMenuList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HeadMenuList>;

export const Default = Template.bind({});
Default.args = { background: '#ff0', label: 'Button' };
