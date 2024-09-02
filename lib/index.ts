export const getStakingUrl = (iPathname = '/') => {
	let pathname = iPathname;
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;
	if (window.location.origin === import.meta.env.PUBLIC_STAKING_URL) return pathname;
	return import.meta.env.PUBLIC_STAKING_URL + pathname;
};

export const getAffiliateUrl = (iPathname = '/') => {
	let pathname = iPathname;
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;
	if (window.location.origin === import.meta.env.PUBLIC_AFFILIATE_URL) return pathname;
	return import.meta.env.PUBLIC_AFFILIATE_URL + pathname;
};

export const getGamesUrl = (iPathname = '/') => {
	let pathname = iPathname;
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;
	if (window.location.origin === import.meta.env.PUBLIC_GAMES_URL) return pathname;
	return import.meta.env.PUBLIC_GAMES_URL + pathname;
};
export const getAcademyUrl = (iPathname = '/') => {
	let pathname = iPathname;
	if (!pathname.startsWith('/')) pathname = `/${pathname}`;
	if (window.location.origin === import.meta.env.PUBLIC_ACADEMY_URL) return pathname;
	return import.meta.env.PUBLIC_ACADEMY_URL + pathname;
};

export const getAppUrl = () => {
	return import.meta.env.PUBLIC_APP_URL;
};
