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
	maxScore: number | null
}

export type CountdownProps = {
	currentScore: number
	maxScore: number
	isRunning: boolean
}
