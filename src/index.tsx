import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'src/pages/App';
import reportWebVitals from 'src/reportWebVitals';
import i18n from 'src/locale';
import store from 'src/store';
import 'nprogress/nprogress.css'; // progress bar style
import 'src/assets/scss/base.scss';

i18n.changeLanguage().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        {/*<React.StrictMode>*/}
        <App />
        {/*</React.StrictMode>*/}
      </HashRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
