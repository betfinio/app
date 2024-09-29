import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
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
instance
	.use(initReactI18next)
	.use(I18nextBrowserLanguageDetector)
	.init({
		resources,
		fallbackLng: 'en',
		defaultNS,
		interpolation: { escapeValue: false },
		react: { useSuspense: true },
		detection: {},
	});

export default instance;
