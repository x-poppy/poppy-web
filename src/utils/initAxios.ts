import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { configure } from 'axios-hooks';
import { getAppConfig } from './appConfig';

let axiosIns: AxiosInstance | null = null;

const mockAdapter = async (cfg: AxiosRequestConfig) => {
  const mockUrl = cfg.headers?.['x-mock-url'];
  if (!mockUrl) {
    throw new Error('Mock url is empty!');
  }

  const results = await fetch(mockUrl);
  const data = await results.json();

  return {
    data,
    status: results.status,
    statusText: results.statusText,
    headers: results.headers,
    config: cfg,
    request: {},
  };
};

export function initAxios(): void {
  if (axiosIns) return;
  const appConfig = getAppConfig();
  axiosIns = axios.create({
    baseURL: appConfig.apiPrefix,
    adapter: appConfig.mock ? mockAdapter : undefined,
  });

  configure({
    axios: axiosIns,
  });
}

export function getAxiosInstance(): AxiosInstance {
  return axiosIns as AxiosInstance;
}
