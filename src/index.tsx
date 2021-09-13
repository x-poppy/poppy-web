import React from 'react';
import ReactDOM from 'react-dom';

import App from 'src/widgets/App/App';

import { initApp } from 'src/utils/initApp';

initApp()
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
  })
  .catch((err) => {
    console.error('app bootstrap error' + err?.stack);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
