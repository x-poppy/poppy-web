import React, { Fragment } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from 'src/pages/Login';
import Layout from 'src/pages/Layout';

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSwitch = async () => {
    await i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN');
  };
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
