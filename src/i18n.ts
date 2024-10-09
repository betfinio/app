import type { i18n } from 'i18next';
import * as i18 from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { localhost } from 'viem/chains';
import czJSON from './translations/cz/shared.json';
import enJSON from './translations/en/shared.json';
import ruJSON from './translations/ru/shared.json';

export const defaultNS = 'shared';
export const defaultLocale = 'en';

export const resources = {
	en: {
		shared: enJSON,
	},
	ru: {
		shared: ruJSON,
	},
	cs: {
		shared: czJSON,
	},
	cz: {
		shared: czJSON,
	},
} as const;

const instance: i18n = i18.createInstance();
instance.use(initReactI18next).init({
	resources,
	fallbackLng: defaultLocale,
	defaultNS,
	interpolation: { escapeValue: false },
	react: { useSuspense: true },
});

export const changeLanguage = (locale: string | null) => {
	const lng = locale ?? defaultLocale;
	instance.changeLanguage(lng);
	localStorage.setItem('i18nextLng', lng);
};

if (!localStorage.getItem('i18nextLng')) {
	const locale = navigator.language.split('-')[0];
	changeLanguage(locale);
} else {
	changeLanguage(localStorage.getItem('i18nextLng'));
}

export default instance;
