/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HeadMenuBar } from 'src/widgets/HeadMenuBar/HeadMenuBar';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';

import styles from './Home.module.css';
// import { HomeMenuList } from 'src/widgets/HomeMenuList/HomeMenuList';
import useAxios from 'axios-hooks';
import { MenuInfo } from 'src/types/MenuInfo';
import type { MenuDataItem } from '@ant-design/pro-layout';

const loopMenuInfoItem = (menus: MenuInfo[] | null): MenuDataItem[] => {
  const data: MenuDataItem[] = []
  if(!menus) {
    return data
  }
  // 循环转化类型
  for (let index = 0; index < menus.length; index++) {
    data[index] = {
      path: '/home',
      icon: menus[index].node.icon,
      name: menus[index].node.resourceCode,
      // 递归
      children: loopMenuInfoItem(menus[index].children) 
    }
  }
  return data
}

export function Home(): JSX.Element {
  const [pathname, setPathname] = useState('/welcome');
  const history = useHistory();
  const { appReadyInfo } = useAppReadyInfo();
  const appInfo = appReadyInfo?.appInfo;

  console.log('before menu')
  // 从接口获取菜单配置
  const [{ data = [] }] = useAxios<MenuInfo[]>({
    url: 'api/v1/menu/head-menu',
    headers: {
      'x-mock-url': './mock/menu/home-menu.json',
    },
  })
  console.log(data)

  // 测试异步执行修改变量的值后，是否同步到页面上展示。初始是true，3秒后应该是false。
  console.log('before')
  let footerRender = true
  setTimeout(function() {
    footerRender = false;
    console.log('false')
  }, 3000);
  console.log('default true')

  return (
    <div className={styles.host}>
      <ProLayout
        locale={undefined}
        title={appInfo?.displayName ?? 'Poppy'}
        logo={appReadyInfo?.appInfo?.icon ?? <HomeFilled style={{ color: '#FFF', fontSize: '22px' }} />}
        location={{
          pathname,
        }}
        // menuItemRender={() => {
        //   return <HomeMenuList />;
        // }}
        menu={{ request: async () => {
          console.log('in menu')
          const menuData = loopMenuInfoItem(data)
          console.log(menuData)
          return menuData
        } }}
        rightContentRender={() => <HeadMenuBar />}
        footerRender={false}
      >
        <PageContainer content="hello">
          <p>
            测试异步执行修改变量的值后，是否同步到页面上展示。初始是true，3秒后应该是false。
          </p>
          { '当前值： ' + footerRender }
        </PageContainer>
      </ProLayout>
    </div>
  );
}
