import React, { Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Login } from 'src/pages/Login/Login';
import { Layout } from 'src/layouts/Layout/Layout';
import { useAppReadyInfo } from './hooks/appReadyInfo';

export default function App (): JSX.Element | null  {
  const appReadyInfo = useAppReadyInfo();

  if (!appReadyInfo) return null;

  // the status is not normal then show the app lock component
  if (appReadyInfo.appInfo.status) {
    return null;
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
