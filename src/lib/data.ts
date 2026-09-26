export { CHAMPIONS, CHAMPIONS_VERSION, type Champion } from './champions';

export const FORM_PLAYER_KEYS = [
	'player_1',
	'player_2',
	'player_3',
	'player_4',
	'player_5',
	'player_6',
	'player_7',
	'player_8',
	'player_9',
	'player_10',
	'player_11',
	'player_12',
	'player_13',
	'player_14',
	'player_15',
	'player_16',
	'player_17',
	'player_18'
] as const;

export const TEAM_SETUP_KEYS = ['duo', 'trio'] as const;
export type TeamSetupKey = (typeof TEAM_SETUP_KEYS)[number];

export type TeamSetup = {
	label: string;
	/** Détail affiché sous le libellé dans le sélecteur de format. */
	hint: string;
	groupLabel: string;
	teamSize: number;
	teamCount: number;
	playerCount: number;
};

export const TEAM_SETUPS: Record<TeamSetupKey, TeamSetup> = {
	duo: {
		label: 'Duos',
		hint: '8 équipes de 2',
		groupLabel: 'Duo',
		teamSize: 2,
		teamCount: 8,
		playerCount: 16
	},
	trio: {
		label: 'Trios',
		hint: '6 équipes de 3',
		groupLabel: 'Trio',
		teamSize: 3,
		teamCount: 6,
		playerCount: 18
	}
};
