import pkg from '../../package.json';
import axios, { AxiosInstance } from 'axios';
import { configure } from 'axios-hooks';
import { getAppConfig } from './getAppConfig';

// this is low level init for application
export async function initApp(): Promise<void> {
  console.info('====================');
  console.info(`${pkg.name}/${pkg.version}`);
  console.info('====================');

  initAxios();
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

export function getAxiosInstance(): AxiosInstance {
  return axiosIns as AxiosInstance;
}
