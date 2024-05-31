export type Champion = {
	id: number;
	slug: string;
	name: string;
	image?: string;
};

export const CHAMPIONS: ReadonlyArray<Champion> = Object.freeze([
	{ id: 1, slug: 'Annie', name: 'Annie' },
	{ id: 2, slug: 'Olaf', name: 'Olaf' },
	{ id: 3, slug: 'Galio', name: 'Galio' },
	{ id: 4, slug: 'TwistedFate', name: 'Twisted Fate' },
	{ id: 5, slug: 'XinZhao', name: 'Xin Zhao' },
	{ id: 6, slug: 'Urgot', name: 'Urgot' },
	{ id: 7, slug: 'LeBlanc', name: 'LeBlanc' },
	{ id: 8, slug: 'Vladimir', name: 'Vladimir' },
	{ id: 9, slug: 'Fiddlesticks', name: 'Fiddlesticks' },
	{ id: 10, slug: 'Kayle', name: 'Kayle' },
	{ id: 11, slug: 'MaîtreYi', name: 'Maître Yi' },
	{ id: 12, slug: 'Alistar', name: 'Alistar' },
	{ id: 13, slug: 'Ryze', name: 'Ryze' },
	{ id: 14, slug: 'Sion', name: 'Sion' },
	{ id: 15, slug: 'Sivir', name: 'Sivir' },
	{ id: 16, slug: 'Soraka', name: 'Soraka' },
	{ id: 17, slug: 'Teemo', name: 'Teemo' },
	{ id: 18, slug: 'Tristana', name: 'Tristana' },
	{ id: 19, slug: 'Warwick', name: 'Warwick' },
	{ id: 20, slug: 'NunuetWillump', name: 'Nunu et Willump' },
	{ id: 21, slug: 'MissFortune', name: 'Miss Fortune' },
	{ id: 22, slug: 'Ashe', name: 'Ashe' },
	{ id: 23, slug: 'Tryndamere', name: 'Tryndamere' },
	{ id: 24, slug: 'Jax', name: 'Jax' },
	{ id: 25, slug: 'Morgana', name: 'Morgana' },
	{ id: 26, slug: 'Zilean', name: 'Zilean' },
	{ id: 27, slug: 'Singed', name: 'Singed' },
	{ id: 28, slug: 'Evelynn', name: 'Evelynn' },
	{ id: 29, slug: 'Twitch', name: 'Twitch' },
	{ id: 30, slug: 'Karthus', name: 'Karthus' },
	{ id: 31, slug: "Cho'Gath", name: "Cho'Gath" },
	{ id: 32, slug: 'Amumu', name: 'Amumu' },
	{ id: 33, slug: 'Rammus', name: 'Rammus' },
	{ id: 34, slug: 'Anivia', name: 'Anivia' },
	{ id: 35, slug: 'Shaco', name: 'Shaco' },
	{ id: 36, slug: 'Dr.Mundo', name: 'Dr. Mundo' },
	{ id: 37, slug: 'Sona', name: 'Sona' },
	{ id: 38, slug: 'Kassadin', name: 'Kassadin' },
	{ id: 39, slug: 'Irelia', name: 'Irelia' },
	{ id: 40, slug: 'Janna', name: 'Janna' },
	{ id: 41, slug: 'Gangplank', name: 'Gangplank' },
	{ id: 42, slug: 'Corki', name: 'Corki' },
	{ id: 43, slug: 'Karma', name: 'Karma' },
	{ id: 44, slug: 'Taric', name: 'Taric' },
	{ id: 45, slug: 'Veigar', name: 'Veigar' },
	{ id: 48, slug: 'Trundle', name: 'Trundle' },
	{ id: 50, slug: 'Swain', name: 'Swain' },
	{ id: 51, slug: 'Caitlyn', name: 'Caitlyn' },
	{ id: 53, slug: 'Blitzcrank', name: 'Blitzcrank' },
	{ id: 54, slug: 'Malphite', name: 'Malphite' },
	{ id: 55, slug: 'Katarina', name: 'Katarina' },
	{ id: 56, slug: 'Nocturne', name: 'Nocturne' },
	{ id: 57, slug: 'Maokai', name: 'Maokai' },
	{ id: 58, slug: 'Renekton', name: 'Renekton' },
	{ id: 59, slug: 'JarvanIV', name: 'Jarvan IV' },
	{ id: 60, slug: 'Elise', name: 'Elise' },
	{ id: 61, slug: 'Orianna', name: 'Orianna' },
	{ id: 62, slug: 'Wukong', name: 'Wukong' },
	{ id: 63, slug: 'Brand', name: 'Brand' },
	{ id: 64, slug: 'LeeSin', name: 'Lee Sin' },
	{ id: 67, slug: 'Vayne', name: 'Vayne' },
	{ id: 68, slug: 'Rumble', name: 'Rumble' },
	{ id: 69, slug: 'Cassiopeia', name: 'Cassiopeia' },
	{ id: 72, slug: 'Skarner', name: 'Skarner' },
	{ id: 74, slug: 'Heimerdinger', name: 'Heimerdinger' },
	{ id: 75, slug: 'Nasus', name: 'Nasus' },
	{ id: 76, slug: 'Nidalee', name: 'Nidalee' },
	{ id: 77, slug: 'Udyr', name: 'Udyr' },
	{ id: 78, slug: 'Poppy', name: 'Poppy' },
	{ id: 79, slug: 'Gragas', name: 'Gragas' },
	{ id: 80, slug: 'Pantheon', name: 'Pantheon' },
	{ id: 81, slug: 'Ezreal', name: 'Ezreal' },
	{ id: 82, slug: 'Mordekaiser', name: 'Mordekaiser' },
	{ id: 83, slug: 'Yorick', name: 'Yorick' },
	{ id: 84, slug: 'Akali', name: 'Akali' },
	{ id: 85, slug: 'Kennen', name: 'Kennen' },
	{ id: 86, slug: 'Garen', name: 'Garen' },
	{ id: 89, slug: 'Leona', name: 'Leona' },
	{ id: 90, slug: 'Malzahar', name: 'Malzahar' },
	{ id: 91, slug: 'Talon', name: 'Talon' },
	{ id: 92, slug: 'Riven', name: 'Riven' },
	{ id: 96, slug: "Kog'Maw", name: "Kog'Maw" },
	{ id: 98, slug: 'Shen', name: 'Shen' },
	{ id: 99, slug: 'Lux', name: 'Lux' },
	{ id: 101, slug: 'Xerath', name: 'Xerath' },
	{ id: 102, slug: 'Shyvana', name: 'Shyvana' },
	{ id: 103, slug: 'Ahri', name: 'Ahri' },
	{ id: 104, slug: 'Graves', name: 'Graves' },
	{ id: 105, slug: 'Fizz', name: 'Fizz' },
	{ id: 106, slug: 'Volibear', name: 'Volibear' },
	{ id: 107, slug: 'Rengar', name: 'Rengar' },
	{ id: 110, slug: 'Varus', name: 'Varus' },
	{ id: 111, slug: 'Nautilus', name: 'Nautilus' },
	{ id: 112, slug: 'Viktor', name: 'Viktor' },
	{ id: 113, slug: 'Sejuani', name: 'Sejuani' },
	{ id: 114, slug: 'Fiora', name: 'Fiora' },
	{ id: 115, slug: 'Ziggs', name: 'Ziggs' },
	{ id: 117, slug: 'Lulu', name: 'Lulu' },
	{ id: 119, slug: 'Draven', name: 'Draven' },
	{ id: 120, slug: 'Hecarim', name: 'Hecarim' },
	{ id: 121, slug: "Kha'Zix", name: "Kha'Zix" },
	{ id: 122, slug: 'Darius', name: 'Darius' },
	{ id: 126, slug: 'Jayce', name: 'Jayce' },
	{ id: 127, slug: 'Lissandra', name: 'Lissandra' },
	{ id: 131, slug: 'Diana', name: 'Diana' },
	{ id: 133, slug: 'Quinn', name: 'Quinn' },
	{ id: 134, slug: 'Syndra', name: 'Syndra' },
	{ id: 136, slug: 'AurelionSol', name: 'Aurelion Sol' },
	{ id: 141, slug: 'Kayn', name: 'Kayn' },
	{ id: 142, slug: 'Zoé', name: 'Zoé' },
	{ id: 143, slug: 'Zyra', name: 'Zyra' },
	{ id: 145, slug: "Kai'Sa", name: "Kai'Sa" },
	{ id: 147, slug: 'Séraphine', name: 'Séraphine' },
	{ id: 150, slug: 'Gnar', name: 'Gnar' },
	{ id: 154, slug: 'Zac', name: 'Zac' },
	{ id: 157, slug: 'Yasuo', name: 'Yasuo' },
	{ id: 161, slug: "Vel'Koz", name: "Vel'Koz" },
	{ id: 163, slug: 'Taliyah', name: 'Taliyah' },
	{ id: 164, slug: 'Camille', name: 'Camille' },
	{ id: 166, slug: 'Akshan', name: 'Akshan' },
	{ id: 200, slug: "Bel'Veth", name: "Bel'Veth" },
	{ id: 201, slug: 'Braum', name: 'Braum' },
	{ id: 202, slug: 'Jhin', name: 'Jhin' },
	{ id: 203, slug: 'Kindred', name: 'Kindred' },
	{ id: 221, slug: 'Zeri', name: 'Zeri' },
	{ id: 222, slug: 'Jinx', name: 'Jinx' },
	{ id: 223, slug: 'TahmKench', name: 'Tahm Kench' },
	{ id: 233, slug: 'Briar', name: 'Briar' },
	{ id: 234, slug: 'Viego', name: 'Viego' },
	{ id: 235, slug: 'Senna', name: 'Senna' },
	{ id: 236, slug: 'Lucian', name: 'Lucian' },
	{ id: 238, slug: 'Zed', name: 'Zed' },
	{ id: 240, slug: 'Kled', name: 'Kled' },
	{ id: 245, slug: 'Ekko', name: 'Ekko' },
	{ id: 246, slug: 'Qiyana', name: 'Qiyana' },
	{ id: 254, slug: 'Vi', name: 'Vi' },
	{ id: 266, slug: 'Aatrox', name: 'Aatrox' },
	{ id: 267, slug: 'Nami', name: 'Nami' },
	{ id: 268, slug: 'Azir', name: 'Azir' },
	{ id: 350, slug: 'Yuumi', name: 'Yuumi' },
	{ id: 360, slug: 'Samira', name: 'Samira' },
	{ id: 412, slug: 'Thresh', name: 'Thresh' },
	{ id: 420, slug: 'Illaoi', name: 'Illaoi' },
	{ id: 421, slug: "Rek'Sai", name: "Rek'Sai" },
	{ id: 427, slug: 'Ivern', name: 'Ivern' },
	{ id: 429, slug: 'Kalista', name: 'Kalista' },
	{ id: 432, slug: 'Bard', name: 'Bard' },
	{ id: 497, slug: 'Rakan', name: 'Rakan' },
	{ id: 498, slug: 'Xayah', name: 'Xayah' },
	{ id: 516, slug: 'Ornn', name: 'Ornn' },
	{ id: 517, slug: 'Sylas', name: 'Sylas' },
	{ id: 518, slug: 'Neeko', name: 'Neeko' },
	{ id: 523, slug: 'Aphelios', name: 'Aphelios' },
	{ id: 526, slug: 'Rell', name: 'Rell' },
	{ id: 555, slug: 'Pyke', name: 'Pyke' },
	{ id: 711, slug: 'Vex', name: 'Vex' },
	{ id: 777, slug: 'Yone', name: 'Yone' },
	{ id: 875, slug: 'Sett', name: 'Sett' },
	{ id: 876, slug: 'Lillia', name: 'Lillia' },
	{ id: 887, slug: 'Gwen', name: 'Gwen' },
	{ id: 888, slug: 'RenataGlasc', name: 'Renata Glasc', image: 'Renata' },
	{ id: 895, slug: 'Nilah', name: 'Nilah' },
	{ id: 897, slug: "K'Santé", name: "K'Santé" },
	{ id: 901, slug: 'Smolder', name: 'Smolder' },
	{ id: 902, slug: 'Milio', name: 'Milio' },
	{ id: 910, slug: 'Hwei', name: 'Hwei' },
	{ id: 950, slug: 'Naafiri', name: 'Naafiri' }
] as const);

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
	'player_16'
] as const;