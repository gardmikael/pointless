const randomQuestions = [
	{q: "Statsministere i Norge etter krigen", a: "Gerhardsen"},
	{q: "Top 50 filmer på IMDb", a: "Avengers: Endgame"},
	{q: "Land som grenser til Østerike", a: "Sveits"},
	{q: "Land på 4 bokstaver", a: "Togo"},
	{q: "Twist", a: "Banan"},
	{q: "Medlemmer fra ABBA eller Beatles", a: "Anni-Frid"},
	{q: "Jordens 10 største innsjøer", a: "Bajkalsjøen"},
	{q: "Kapteiner på landslaget", a: "Henning Berg"},
	{q: "Land som har spilt VM finale (menn)", a: "Kroatia"},
]

export const getRandomQuestion = () =>
	randomQuestions[Math.floor(Math.random() * randomQuestions.length)]