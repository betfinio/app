
export const getStakingUrl = () => {
	switch (import.meta.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			if (window.location.origin === 'https://betfin-staking-dev.web.app') {
				return ''
			}
			return 'https://betfin-staking-dev.web.app'
		case 'production':
			if (window.location.origin === 'https://staking.betfin.io') {
				return ''
			} else {
				return 'https://staking.betfin.io'
			}
		default:
			if (window.location.origin === 'http://localhost:3000') {
				return ''
			} else {
				return 'http://localhost:3000'
			}
	}
}

export const getGamesUrl = () => {
	switch (import.meta.env.PUBLIC_ENVIRONMENT) {
		case 'development':
			return 'https://betfin-games-dev.web.app'
		case 'production':
			return 'https://betfin-games.web.app'
		default:
			return 'http://localhost:4000'
	}
}
