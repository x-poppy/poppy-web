import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios';
import zhCN from './lang/zh-CN';

const $$LOCALE_LANG = 'zh-CN';
const loadedLanguages = [$$LOCALE_LANG]; // 我们的预装默认语言

i18n
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    fallbackLng: $$LOCALE_LANG,
    // lng: 'zh-CN',
    debug: false,
    resources: {
      [$$LOCALE_LANG]: {
        translation: zhCN,
      },
    },
    interpolation: {
      // not needed for react as it escapes by default
      escapeValue: false,
    },
  });

const _changeLanguage = i18n.changeLanguage;
i18n.changeLanguage = (lng = i18n.language, callback?) => {
  if (!loadedLanguages.includes(lng)) {
    // 语言未加载
    return import(/* webpackChunkName: "lang-[request]" */ `src/locale/lang/${lng}.ts`).then((res) => {
      i18n.addResourceBundle('en-US', 'translation', res.default, true, true);
      loadedLanguages.push(lng);
      return i18n.changeLanguage(lng, callback);
    });
  }
  const l = lng.split('-')[0];
  axios.defaults.headers.common['Accept-Language'] = l;
  window.document.querySelector('html')?.setAttribute('lang', l);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return _changeLanguage.call(i18n, lng, callback).finally(() => {});
};

export default i18n;
