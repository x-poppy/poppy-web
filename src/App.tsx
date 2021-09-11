import React, { Fragment } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Login } from 'src/pages/Login/Login';
import { Layout } from 'src/layouts/Layout/Layout';
import { useAppReadyInfo } from './utils/appReadyInfo';
import { AppErrorState } from './components/AppErrorState/AppErrorState';

import './App.module.css';

export default function App(): JSX.Element | null {
  const appReadyInfoState = useAppReadyInfo();
  const appInfo = appReadyInfoState.appReadyInfo?.appInfo;

  if (!appInfo || appInfo.status !== 'normal' || appInfo.isExpired) {
    return <AppErrorState loading={appReadyInfoState.loading} expired={!!appInfo?.isExpired} error={!!appReadyInfoState.error} disabled={appInfo?.status !== 'normal'} />;
  }

  return (
    <>
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Layout} />
          {/*<Redirect to="/" exact/>*/}
        </Switch>
      </HashRouter>
    </>
  );
}
