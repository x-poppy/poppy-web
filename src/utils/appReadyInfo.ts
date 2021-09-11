import { useEffect, useState } from 'react';
import { AppInfo } from 'src/types/AppInfo';
import { AppReadyInfo } from 'src/types/AppReadyInfo';
import { AppReadyInfoState } from 'src/types/AppReadyInfoState';
import { getAppConfig } from 'src/utils/getAppConfig';
import { getAxiosInstance } from 'src/utils/initApp';

let appReadyInfo: AppReadyInfo | null = null;

export function getAppReadyInfo(): AppReadyInfo {
  return appReadyInfo as AppReadyInfo;
}

async function loadAppReadyInfo(): Promise<AppReadyInfo> {
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

export function useAppReadyInfo(): AppReadyInfoState {
  const [appReadyInfoState, setAppReadyInfoState] = useState<AppReadyInfoState>({
    loading: true,
    error: null,
    appReadyInfo: null,
  });

  useEffect(() => {
    if (!appReadyInfoState.loading) return;
    (async () => {
      try {
        const appReadyInfo = await loadAppReadyInfo();
        setAppReadyInfoState({
          loading: false,
          error: null,
          appReadyInfo,
        });
      } catch (err) {
        if (!err) {
          // eslint-disable-next-line no-ex-assign
          err = new Error('UnknownError');
        }

        setAppReadyInfoState({
          loading: false,
          error: err,
          appReadyInfo: null,
        });
      }
    })();
  }, []);

  return appReadyInfoState;
}
