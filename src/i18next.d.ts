import type { resources } from './i18n';

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'shared';
		resources: (typeof resources)['en'];
	}
}

export type ILanguageKeys = (typeof resources)['en']['shared'];
