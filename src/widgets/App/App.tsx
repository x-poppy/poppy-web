import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Login } from 'src/pages/Login/Login';
import { Home } from 'src/pages/Home/Home';
import { useAppReadyInfo } from '../../utils/appReadyInfo';
import { AppEmptyState } from '../../components/AppEmptyState/AppEmptyState';

import styles from './App.module.css';
import { AppLoading } from '../../components/AppLoading/AppLoading';

interface AppProps {
  isWrapper?: boolean;
  children?: React.ReactNode;
}

export const App: React.FC<AppProps> = (props: AppProps) => {
  const isWrapper = props.isWrapper ?? false;
  const appReadyInfoState = useAppReadyInfo();

  if (appReadyInfoState.loading) {
    return <AppLoading />;
  }

  const appInfo = appReadyInfoState.appReadyInfo?.appInfo;
  if (!appInfo || appInfo.status !== 'normal' || appInfo.isExpired) {
    return <AppEmptyState expired={!!appInfo?.isExpired} error={!!appReadyInfoState.error} disabled={!!appInfo?.status && appInfo?.status !== 'normal'} />;
  }

  if (isWrapper) {
    return <div className={styles.host}>{props.children}</div>;
  }

  return (
    <div className={styles.host}>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
          {/*<Redirect to="/" exact/>*/}
        </Switch>
      </HashRouter>
    </div>
  );
};
