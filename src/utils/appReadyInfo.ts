import { useEffect, useState } from 'react';
import { AppInfo } from 'src/types/AppInfo';
import { AppReadyInfo } from 'src/types/AppReadyInfo';
import { AppReadyInfoState } from 'src/types/AppReadyInfoState';
import { getAppConfig } from 'src/utils/appConfig';
import { getAxiosInstance } from 'src/utils/initAxios';
import { initApp } from './initApp';
import { initI18n } from './initI18n';
import { initCSSVariables } from './initCSSVariables';

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

  const { data: domainInfoData } = await axiosIns.get(`/api/v1/app-ui/domain-info/${encodeURIComponent(appConfig.appDomain)}`, {
    headers: {
      'x-mock-url': './mock/app-ui/domain-info.json',
    },
  });
  const appNo = domainInfoData.appNo;

  const uiInfosResponse = await Promise.all([
    axiosIns.get(`/api/v1/app-ui/app-info/${appNo}}`, {
      headers: {
        'x-mock-url': './mock/app-ui/app-info.json',
      },
    }),
    axiosIns.get(`/api/v1/app-ui/theme-info/${appNo}}`, {
      headers: {
        'x-mock-url': './mock/app-ui/theme-info.json',
      },
    }),
  ]);

  const appInfo = uiInfosResponse[0].data as AppInfo;
  const themeInfo = uiInfosResponse[1].data as Record<string, string>;

  await initI18n(appInfo?.locale);

  appReadyInfo = {
    appInfo,
    themeInfo,
  };

  return appReadyInfo;
}

export function useAppReadyInfo(): AppReadyInfoState {
  const [appReadyInfoState, setAppReadyInfoState] = useState<AppReadyInfoState>(
    appReadyInfo
      ? {
          loading: false,
          error: null,
          appReadyInfo,
        }
      : {
          loading: true,
          error: null,
          appReadyInfo: null,
        },
  );

  useEffect(() => {
    if (appReadyInfo) return;

    if (!appReadyInfoState.loading) return;
    if (appReadyInfoState.error) return;
    if (appReadyInfoState.appReadyInfo) return;

    (async () => {
      try {
        await initApp();
        const appReadyInfo = await loadAppReadyInfo();
        setAppReadyInfoState({
          loading: false,
          error: null,
          appReadyInfo,
        });
        initCSSVariables(appReadyInfo.themeInfo);
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
