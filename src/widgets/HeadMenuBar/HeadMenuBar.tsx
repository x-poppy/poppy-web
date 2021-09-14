import React from 'react';
import { Avatar, Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import useAxios from 'axios-hooks';

const { SubMenu } = Menu;

export const HeadMenuBar: React.FC = () => {
  const [{ data, loading, error }] = useAxios({
    url: '/api/v1/menu/head-menu',
    headers: {
      'x-mock-url': './mock/menu/head-menu.json',
    },
  });

  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item key="mail" icon={<Avatar size="large" icon={<UserOutlined />} />}>
        Navigation One
      </Menu.Item>

      <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
        Navigation Two
      </Menu.Item>

      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.ItemGroup key="g1" title="Item 1">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
};
