import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';

const resources = {
	en: {translation: enJSON},
	ru: {translation: ruJSON},
};

const appInstance = i18n.createInstance();
appInstance.use(initReactI18next).init({
	resources,
	lng: 'en', // default language
	fallbackLng: 'en',
	interpolation: {escapeValue: false},
	react: {useSuspense: true},
});

export default appInstance;
