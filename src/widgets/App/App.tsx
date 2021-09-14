import React, { Fragment } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import { Login } from 'src/pages/Login/Login';
import { Layout } from 'src/pages/Home/Home';
import { useAppReadyInfo } from '../../utils/appReadyInfo';
import { AppEmptyState } from '../../components/AppEmptyState/AppEmptyState';

import './App.module.css';
import { AppLoading } from '../../components/AppLoading/AppLoading';

export default function App(): JSX.Element | null {
  const appReadyInfoState = useAppReadyInfo();

  if (appReadyInfoState.loading) {
    return <AppLoading />;
  }

  const appInfo = appReadyInfoState.appReadyInfo?.appInfo;
  if (!appInfo || appInfo.status !== 'normal' || appInfo.isExpired) {
    return <AppEmptyState expired={!!appInfo?.isExpired} error={!!appReadyInfoState.error} disabled={appInfo?.status !== 'normal'} />;
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
