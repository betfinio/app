import * as i18 from 'i18next';
import {initReactI18next} from 'react-i18next';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';
import {i18n} from "i18next";

const resources = {
	en: {translation: enJSON},
	ru: {translation: ruJSON},
};

const instance: i18n = i18.createInstance();
instance.use(initReactI18next).init({
	resources,
	lng: 'en', // default language
	fallbackLng: 'en',
	interpolation: {escapeValue: false},
	react: {useSuspense: true},
});

export default instance;
