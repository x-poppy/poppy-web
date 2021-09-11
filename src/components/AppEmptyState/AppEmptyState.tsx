import React from 'react';
import { Result } from 'antd';
import { AppInfoData } from 'src/types/AppInfoData';

interface AppEmptyStateProps {
  appInfo?: AppInfoData;
}

export const AppEmptyState: React.FC<AppEmptyStateProps> = (props: AppEmptyStateProps) => {
  const appInfo = props.appInfo;
  const title = '12112';
  const subTitle = '121212';

  return <Result status="403" title={title} subTitle={subTitle} />;
};
