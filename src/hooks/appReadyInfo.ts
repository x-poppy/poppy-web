import { useEffect, useState } from 'react';
import { AppReadyInfo } from 'src/types/AppReadyInfo';
import { loadAppReadyInfo } from 'src/utils/getAppReadyInfo';

export function useAppReadyInfo(): AppReadyInfo | null {
  const [appReadyInfo, setAppReadyInfo] = useState<AppReadyInfo | null>(null);

  useEffect(() => {
    if (appReadyInfo) return;
    (async () => {
      const appReadyInfo = await loadAppReadyInfo();
      setAppReadyInfo(appReadyInfo);
    })();
  }, []);

  return appReadyInfo;
}
