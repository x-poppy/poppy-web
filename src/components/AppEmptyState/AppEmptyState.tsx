import React from 'react';
import { Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { ResultStatusType } from 'antd/lib/result';

import styles from './AppEmptyState.module.css';

interface AppEmptyStateProps {
  error: boolean;
  expired: boolean;
  disabled: boolean;
}

export const AppEmptyState: React.FC<AppEmptyStateProps> = (props: AppEmptyStateProps) => {
  const { t } = useTranslation();

  let title = '';
  let subTitle = '';
  let status: ResultStatusType = '403';

  if (props.error) {
    title = t('AppEmptyState_App_Error_Title');
    subTitle = t('AppEmptyState_App_Error_Subtitle');
  } else if (props.disabled) {
    title = t('AppEmptyState_App_Disabled_Title');
    subTitle = t('AppEmptyState_App_Disabled_Subtitle');
  } else if (props.expired) {
    title = t('AppEmptyState_App_Expired_Title');
    subTitle = t('AppEmptyState_App_Expired_Subtitle');
  } else {
    title = 'Success';
    status = 'success';
  }

  return (
    <div className={styles.host}>
      <Result status={status} title={title} subTitle={subTitle} />
    </div>
  );
};
