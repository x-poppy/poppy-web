import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Login } from 'src/pages/Login/Login';
import { Home } from 'src/pages/Home/Home';
import { useAppReadyInfo } from 'src/utils/appReadyInfo';
import { AppEmptyState } from 'src/components/AppEmptyState/AppEmptyState';
import { AppLoading } from 'src/components/AppLoading/AppLoading';
import styles from './App.module.css';
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
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="*" component={Login} />
        </Switch>
      </HashRouter>
    </div>
  );
};
