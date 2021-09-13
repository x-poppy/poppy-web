import pkg from '../../package.json';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
import { initAxios } from './initAxios';

// this is low level init for application
export async function initApp(): Promise<void> {
  console.info('====================');
  console.info(`${pkg.name}/${pkg.version}`);
  console.info('====================');

  initAxios();
  initNProgress();
}

function initNProgress() {
  NProgress.configure({ showSpinner: false });
}
