/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Avatar } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { HeadMenuBar } from 'src/widgets/HeadMenuBar/HeadMenuBar';
import styles from './Home.module.css';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';
import { AppTitleLogo } from 'src/widgets/AppTitleLogo/AppTitleLogo';

export function Home(): JSX.Element {
  const [pathname, setPathname] = useState('/welcome');
  const history = useHistory();
  const { appReadyInfo } = useAppReadyInfo();
  const appInfo = appReadyInfo?.appInfo;

  return (
    <div className={styles.host}>
      <ProLayout
        title={appInfo?.displayName ?? 'Poppy'}
        logo={appReadyInfo?.appInfo?.icon ?? <HomeFilled style={{ color: '#FFF', fontSize: '22px' }} />}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
              history.push(item.path!);
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => <HeadMenuBar />}
      >
        <PageContainer content="hello">Hello</PageContainer>
      </ProLayout>
    </div>
  );
}
