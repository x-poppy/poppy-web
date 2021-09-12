import pkg from '../../package.json';
import axios, { AxiosInstance } from 'axios';
import { configure } from 'axios-hooks';
import { getAppConfig } from './getAppConfig';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style

// this is low level init for application
export async function initApp(): Promise<void> {
  console.info('====================');
  console.info(`${pkg.name}/${pkg.version}`);
  console.info('====================');

  initAxios();
  initNProgress();
}

let axiosIns: AxiosInstance | null = null;

function initAxios() {
  if (axiosIns) return;

  const appConfig = getAppConfig();
  axiosIns = axios.create({
    baseURL: appConfig.apiPrefix,
  });

  configure({
    axios: axiosIns,
  });
}

function initNProgress() {
  NProgress.configure({ showSpinner: false });
}

export function getAxiosInstance(): AxiosInstance {
  return axiosIns as AxiosInstance;
}
