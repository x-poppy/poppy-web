import pkg from '../../package.json';
import axios from 'axios';
import { configure } from 'axios-hooks';
import { getAppConfig } from './getAppConfig';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
import { initI18n } from './initI18n';

// this is low level init for application
export async function initApp() {
  console.info('====================');
  console.info(`${pkg.name}/${pkg.version}`);
  console.info('====================');

  initAxios();
  initNProgress();
  initI18n();
}

function initAxios() {
  const appConfig = getAppConfig();
  const axiosIns = axios.create({
    baseURL: appConfig.apiPrefix,
  });

  configure({
    axios: axiosIns,
  });
}

function initNProgress() {
  NProgress.configure({ showSpinner: false });
}
