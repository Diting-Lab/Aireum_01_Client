import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getContext } from '../../utils/helpers/appContext';

const profile = getContext('appProfile');
const locale = profile
  ? profile.preference.locale
  : process.env.REACT_APP_DEFAULT_LOCALE;

console.log('default locale is ', process.env.REACT_APP_DEFAULT_LOCALE);

console.log('locale from config is ', locale);

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: locale,
  resources: {
    en: {
      appBar: require('./locales/en/Components/AppBar.json'),
      settings: require('./locales/en/Components/Settings.json'),
      form: require('./locales/en/Components/Form.json'),
    },
    zhCN: {
      appBar: require('./locales/zhCN/Components/AppBar.json'),
      settings: require('./locales/zhCN/Components/Settings.json'),
      form: require('./locales/zhCN/Components/Form.json'),
    },
  },
  ns: ['translations', 'test', 'appBar', 'settings', 'form'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'zhCN'];

export default i18n;
