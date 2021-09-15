import React, { useMemo } from 'react';
import { Menu } from 'antd';
import useAxios from 'axios-hooks';
import { MenuInfo } from 'src/types/MenuInfo';
import * as AllIcons from '@ant-design/icons';

function buildMenuTrees(menuInfos: MenuInfo[] | null, level: number): React.ReactElement[] | null {
  if (!menuInfos || menuInfos.length === 0) return null;

  return menuInfos.map((menuInfo) => {
    const menuInfoNode = menuInfo.node;

    let iconElement: null | React.ReactElement = null;
    if (menuInfoNode.icon) {
      const IconElement = (AllIcons as any)[menuInfoNode.icon];
      iconElement = <IconElement style={{ fontSize: '22px' }} />;
    }

    if (menuInfo.children && menuInfo.children.length > 0) {
      return (
        <Menu.SubMenu key={menuInfoNode.resourceCode} icon={iconElement} title={level > 0 && menuInfoNode.label}>
          {buildMenuTrees(menuInfo.children, level + 1)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item title={menuInfoNode.label} key={menuInfoNode.resourceCode} icon={iconElement}>
        {menuInfoNode.label}
      </Menu.Item>
    );
  });
}

export const HomeMenuList: React.FC = () => {
  const [{ data = [] }] = useAxios<MenuInfo[]>({
    url: '/api/v1/menu/head-menu',
    headers: {
      'x-mock-url': './mock/menu/home-menu.json',
    },
  });

  return <Menu mode="vertical">{buildMenuTrees(data as MenuInfo[], 0)}</Menu>;
};
