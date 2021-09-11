import React, { useMemo } from 'react';
import { Result } from 'antd';
import { Spin } from 'antd';

import styles from './AppReadyState.module.css';
import { ResultStatusType } from 'antd/lib/result';

interface AppErrorStateProps {
  error: boolean;
  loading: boolean;
  expired: boolean;
  disabled: boolean;
}

export const AppErrorState: React.FC<AppErrorStateProps> = (props: AppErrorStateProps) => {
  const stateResultComponent = useMemo(() => {
    if (props.loading) {
      return <Spin spinning={true} size="large" />;
    }

    let title = '';
    let subTitle = '';
    let status: ResultStatusType = '403';

    if (props.disabled) {
      title = '1';
      subTitle = '2';
    } else if (props.expired) {
      title = '1';
      subTitle = '3';
    } else if (props.error) {
      title = '1';
      subTitle = '3';
    } else {
      status = 'success';
    }

    return <Result status={status} title={title} subTitle={subTitle} />;
  }, [props.loading, props.disabled, props.error, props.expired]);

  return <div className={styles.appReadyState}>{stateResultComponent}</div>;
};
