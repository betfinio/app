import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import { initReactI18next } from 'react-i18next';
import czJSON from './translations/cz/shared.json';
import enJSON from './translations/en/shared.json';
import ruJSON from './translations/ru/shared.json';

export const defaultNS = 'shared';

export const resources = {
	en: {
		shared: enJSON,
	},
	ru: {
		shared: ruJSON,
	},
	cz: {
		shared: czJSON,
	},
} as const;

const instance: i18n = i18.createInstance();
instance.use(initReactI18next).init({
	resources,
	lng: 'en', // default language
	fallbackLng: 'en',
	defaultNS,
	interpolation: { escapeValue: false },
	react: { useSuspense: true },
});

export default instance;
