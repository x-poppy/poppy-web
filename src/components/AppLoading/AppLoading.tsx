import React from 'react';
import { Spin } from 'antd';
import styles from './AppLoading.module.css';

export const AppLoading: React.FC = () => {
  return (
    <div className={styles.host}>
      <Spin spinning={true} size="large" />
    </div>
  );
};
