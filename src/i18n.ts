import * as i18 from 'i18next';
import type { i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import czJSON from './translations/cz.json';
import enJSON from './translations/en.json';
import ruJSON from './translations/ru.json';

const resources = {
	en: {
		translation: {
			shared: enJSON,
		},
	},
	ru: {
		translation: {
			shared: ruJSON,
		},
	},
	cz: {
		translation: {
			shared: czJSON,
		},
	},
};

const instance: i18n = i18.createInstance();
instance.use(initReactI18next).init({
	resources,
	lng: 'en', // default language
	fallbackLng: 'en',
	interpolation: { escapeValue: false },
	react: { useSuspense: true },
});

export default instance;
