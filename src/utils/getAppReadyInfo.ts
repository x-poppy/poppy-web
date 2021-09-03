import { getAppConfig } from './getAppConfig';
import { getAxiosInstance } from './initApp';
import { AppInfo } from 'src/types/AppInfo';
import { AppReadyInfo } from 'src/types/AppReadyInfo';

let appReadyInfo: AppReadyInfo | null = null;

export function getAppReadyInfo(): AppReadyInfo {
  return appReadyInfo as AppReadyInfo;
}

export async function loadAppReadyInfo(): Promise<AppReadyInfo> {
  if (appReadyInfo) {
    return appReadyInfo;
  }

  const appConfig = getAppConfig();
  const axiosIns = getAxiosInstance();

  const { data: domainInfoData } = await axiosIns.get(`/api/v1/app-ui/domain-info/${encodeURIComponent(appConfig.appDomain)}}`);
  const appNo = domainInfoData.appNo;

  const uiInfosResponse = await Promise.all([axiosIns.get(`/api/v1/app-ui/app-info/${appNo}}`), axiosIns.get(`/api/v1/app-ui/theme-info/${appNo}}`)]);

  const appInfo = uiInfosResponse[0].data as AppInfo;
  const themeInfo = uiInfosResponse[1].data as Record<string, string>;

  appReadyInfo = {
    appInfo,
    themeInfo,
  };

  return appReadyInfo;
}
