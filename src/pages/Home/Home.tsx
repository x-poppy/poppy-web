/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HeadMenuBar } from 'src/widgets/HeadMenuBar/HeadMenuBar';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';

import styles from './Home.module.css';
import { HomeMenuList } from 'src/widgets/HomeMenuList/HomeMenuList';

export function Home(): JSX.Element {
  const [pathname, setPathname] = useState('/welcome');
  const history = useHistory();
  const { appReadyInfo } = useAppReadyInfo();
  const appInfo = appReadyInfo?.appInfo;

  return (
    <div className={styles.host}>
      <ProLayout
        locale={undefined}
        title={appInfo?.displayName ?? 'Poppy'}
        logo={appReadyInfo?.appInfo?.icon ?? <HomeFilled style={{ color: '#FFF', fontSize: '22px' }} />}
        location={{
          pathname,
        }}
        menuItemRender={() => {
          return <HomeMenuList />;
        }}
        rightContentRender={() => <HeadMenuBar />}
        footerRender={false}
      >
        <PageContainer content="hello">
          <HomeMenuList />
        </PageContainer>
      </ProLayout>
    </div>
  );
}
