const randomQuestions = [
	{q: "Statsministere i Norge etter krigen", a: "Gerhardsen"},
	{q:"Top 50 filmer på IMDb", a: "Avengers: Endgame"},
	{q: "Land som grenser til Østerike", a: "Sveits"},
]

export const getRandomQuestion = () =>
	randomQuestions[Math.floor(Math.random() * randomQuestions.length)]