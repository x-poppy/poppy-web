import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const ns = ['common'];
const supportedLngs = ['en', 'fr', 'ja'];

export function initI18n() {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      defaultNS: 'common',
      ns,
      supportedLngs,
      react: {
        wait: true,
      },
    });

  // supportedLngs.forEach((lang) => {
  //   ns.forEach((n) => {
  //     i18n.addResources(lang, n, require(`../public/locales/${lang}/${n}.json`));
  //   });
  // });
}
