import { App } from '../src/widgets/App/App';
import 'antd/dist/antd.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

window.appConfig = {
  mock: true,
};

export const decorators = [(Story) => <App isWrapper={true}>{Story()}</App>];
