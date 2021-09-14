import { Avatar } from 'antd';
import React from 'react';
import { HomeFilled } from '@ant-design/icons';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';

export function AppTitleLogo(): JSX.Element {
  const { appReadyInfo } = useAppReadyInfo();
  return (
    <div>
      <Avatar size={32} draggable={false} shape="circle" icon={<HomeFilled />} alt="logo" />
      <h1>{appReadyInfo?.appInfo.displayName ?? 'Poppy'}</h1>
    </div>
  );
}
