/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HeadMenuBar } from 'src/widgets/HeadMenuBar/HeadMenuBar';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';
import { getAxiosInstance } from 'src/utils/initAxios';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

import styles from './Home.module.css';
// import { HomeMenuList } from 'src/widgets/HomeMenuList/HomeMenuList';
import { MenuInfo } from 'src/types/MenuInfo';
import type { MenuDataItem } from '@ant-design/pro-layout';

const IconMap = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const loopMenuInfoItem = (menus: MenuInfo[] | null): MenuDataItem[] => {
  const data: MenuDataItem[] = []
  if(!menus) {
    return data
  }
  // 循环转化类型
  for (let index = 0; index < menus.length; index++) {
    data[index] = {
      path: '/home/' + menus[index].node.resourceCode + index,
      // icon: menus[index].node.icon && IconMap[menus[index].node.icon as string],
      icon: IconMap.smile,
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
  const axiosIns = getAxiosInstance();

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
          // 同步获取home menu数据
          const { data = [] } = await axiosIns.get(`api/v1/menu/home-menu`, {
            headers: {
              'x-mock-url': './mock/menu/home-menu.json',
            },
          });
          return loopMenuInfoItem(data)
        } }}
        rightContentRender={() => <HeadMenuBar />}
        footerRender={false}
      >
        <PageContainer content="hello">
        </PageContainer>
      </ProLayout>
    </div>
  );
}
