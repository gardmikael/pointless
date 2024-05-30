export type PlaceInfo = {
	[key: number]: {
		className: string
		text: string
	}
}

export type Option = {
	title: string
	score: number | null
}

export type Question = {
	question: string
	options: Option[]
	maxScore: number
}

export type CountdownProps = {
	currentScore: number
	isRunning: boolean
}

export type Team = {
	name: string
	scores: number[][]
}
