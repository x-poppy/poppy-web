import pkg from '../../package.json';
import axios from 'axios';
import { configure } from 'axios-hooks';
import { getAppConfig } from './getAppConfig';

// this is low level init for application
export async function initApp() {
  console.info('====================');
  console.info(`${pkg.name}/${pkg.version}`);
  console.info('====================');

  initAxios();
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
