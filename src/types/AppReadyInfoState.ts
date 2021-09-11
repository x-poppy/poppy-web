import { AppReadyInfo } from './AppReadyInfo';

export interface AppReadyInfoState {
  loading: boolean;
  error: unknown;
  appReadyInfo: AppReadyInfo | null;
}
