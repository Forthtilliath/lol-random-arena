// Must stay >= the largest TEAM_SETUPS playerCount (18, for the 6-trios setup) so there are
// always enough champions left to give every player a different one in assignChampionsToTeams.
export const MIN_NON_BANNED_CHAMPIONS = 18;

export const LS_KEY = 'lol-random-arena';

// Noms des monstres de la Faille ; le composant ajoute le préfixe « Équipe ».
export const TEAM_NAMES = [
	'Carapateur',
	'Poro',
	'Raptor',
	'Loup',
	'Krug',
	'Sbire',
	'Gromp',
	'Sentinelle'
];
