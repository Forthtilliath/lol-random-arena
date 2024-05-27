export const load = async () => {
	const html = await fetch('https://www.leagueofgraphs.com/fr/champions/builds/master/arena')
		.then((r) => r.text())

	return {
		html
	};
};
