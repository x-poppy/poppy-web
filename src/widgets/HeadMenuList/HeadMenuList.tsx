import React from 'react';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';

interface HeadMenuListProps {}

export const HeadMenuList: React.FC<HeadMenuListProps> = (props: HeadMenuListProps) => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail1" icon={<MailOutlined />}>
        123123123123123
      </Menu.Item>
      <Menu.Item key="mail2" icon={<MailOutlined />}>
        12312313123
      </Menu.Item>
    </Menu>
  );
};
