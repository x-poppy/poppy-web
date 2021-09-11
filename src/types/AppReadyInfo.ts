import { AppInfo } from './AppInfo';

export interface AppReadyInfo {
  appInfo: AppInfo;
  themeInfo: Record<string, string>;
}
