interface AppConfig {
  apiPrefix: string;
  appDomain: string;
  [key: string]: string | boolean | number | null;
}

const defaultAppConfig: AppConfig = {
  appDomain: location.host,
  apiPrefix: 'http://localhost:7001/v1/api',
};

let appConfig: AppConfig | null = null;

function getAppConfigFromScriptElement(): AppConfig {
  const configScript = document.querySelector('[data-app-config]');
  let appConfig = null;
  if (configScript && configScript.innerHTML) {
    try {
      appConfig = JSON.parse(configScript.innerHTML);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
  return appConfig;
}

function getAppConfigFromURLParameters(): AppConfig {
  const searchParams = new URLSearchParams(window.location.search);
  const appConfig = {} as AppConfig;
  // eslint-disable-next-line prefer-const
  for (let [key, val] of searchParams) {
    val = val.toLowerCase();
    if (val === 'true' || val === '') {
      appConfig[key] = true;
    } else if (val === 'false') {
      appConfig[key] = false;
    } else if (Number.isInteger(Number(val))) {
      appConfig[key] = Number(val);
    } else {
      appConfig[key] = val;
    }
  }

  return appConfig;
}

function getAppConfigFromWindow(): AppConfig {
  if ('appConfig' in window) {
    return (window as unknown as Record<string, AppConfig>).appConfig;
  }
  return {} as AppConfig;
}

export function getAppConfig(): AppConfig {
  if (appConfig) return appConfig;

  appConfig = {
    ...defaultAppConfig,
    ...getAppConfigFromScriptElement(),
    ...getAppConfigFromWindow(),
    ...getAppConfigFromURLParameters(),
  };

  return appConfig;
}
