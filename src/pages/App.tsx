import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from 'src/pages/Login';
import Layout from 'src/pages/Layout';

export default function App() {
  const { t, i18n } = useTranslation();
  const handleSwitch = async () => {
    await i18n.changeLanguage(i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN');
  };
  return (
    <Fragment>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Layout} />
        {/*<Redirect to="/" exact/>*/}
      </Switch>
    </Fragment>
  );
}
