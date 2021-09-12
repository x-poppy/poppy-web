import { initReactI18next } from 'react-i18next';
import i18n, { Resource } from 'i18next';

const ns = ['common'];
const supportedLangs = ['en-US', 'zh-CN'];
const defaultLang = 'en-US';

export async function initI18n(locale: string): Promise<void> {
  if (!supportedLangs.includes(locale)) {
    locale = defaultLang;
  }

  const langModule: Record<string, unknown> = await import(/* webpackChunkName: "lang-[request]" */ `src/locales/${locale}.ts`);

  const langResource = {
    [locale]: {
      translation: langModule.default,
    },
  } as Resource;

  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: locale,
    interpolation: {
      escapeValue: false,
    },
    resources: langResource,
    defaultNS: 'common',
    ns,
    supportedLngs: supportedLangs,
    react: {
      wait: true,
      useSuspense: false,
    },
  });
}
