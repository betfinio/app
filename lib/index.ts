export const getStakingUrl = (pathname: string = '/') => {
	if (!pathname.startsWith('/')) pathname = '/' + pathname;
	if (window.location.origin === import.meta.env.PUBLIC_STAKING_URL) return pathname
	return import.meta.env.PUBLIC_STAKING_URL + pathname;
}

export const getAffiliateUrl = (pathname: string = '/') => {
	if (!pathname.startsWith('/')) pathname = '/' + pathname;
	if (window.location.origin === import.meta.env.PUBLIC_AFFILIATE_URL) return pathname
	return import.meta.env.PUBLIC_AFFILIATE_URL + pathname;
}

export const getGamesUrl = (pathname: string = '/') => {
	if (!pathname.startsWith('/')) pathname = '/' + pathname;
	if (window.location.origin === import.meta.env.PUBLIC_GAMES_URL) return pathname
	return import.meta.env.PUBLIC_GAMES_URL + pathname;
}

export const getAppUrl = () => {
	return import.meta.env.PUBLIC_APP_URL;
}