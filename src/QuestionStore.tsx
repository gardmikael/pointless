import { create } from "zustand"

const teams = [
	{
		name: "Lag 1",
		scores: [-1],
	},
]

export type Option = {
	title: string
	score: number | null
}

export type Question = {
	question: string
	options: Option[]
	maxScore: number | null
}

type Team = {
	name: string
	scores: number[]
}

type State = {
	questions: Question[]
	qIndex: number
	setQIndex: (index: number) => void
	teams: Team[]
	activeTeamIndex: number
	updateActiveTeamIndex: (index: number) => void
	addTeam: (team: Team) => void
	updateTeam: (teamIndex: number, team: Team) => void
	removeTeam: (teamIndex: number) => void
	addQuestion: (question: Question) => void
	addOption: (questionIndex: number, option: Option) => void
	updateQuestion: (questionIndex: number, question: string) => void
	updateOption: (
		questionIndex: number,
		optionIndex: number,
		option: Option
	) => void
	removeOption: (questionIndex: number, optionIndex: number) => void
	removeQuestion: (questionIndex: number) => void
	updateMaxScore: (questionIndex: number, maxScore: number | null) => void
}

export const useQuestionStore = create<State>((set) => ({
	questions: [
		{
			question: `Hovedsteder som begynner på bokstaven "B"`,
			options: [{ title: "Belmopan", score: 2 }],
			maxScore: 30,
		},
	],
	qIndex: 0,
	setQIndex: (index: number) => set((state) => ({ qIndex: index })),
	teams: teams,
	activeTeamIndex: 0,
	updateActiveTeamIndex: (index: number) =>
		set((state) => ({ activeTeamIndex: index })),
	addTeam: (team: Team) => set((state) => ({ teams: [...state.teams, team] })),
	updateTeam: (teamIndex: number, team: Team) =>
		set((state) => {
			const teams = [...state.teams]
			teams[teamIndex] = team
			return { teams }
		}),
	removeTeam: (teamIndex: number) =>
		set((state) => {
			const teams = [...state.teams]
			teams.splice(teamIndex, 1)
			return { teams }
		}),
	addQuestion: (question: Question) =>
		set((state) => ({
			questions: [...state.questions, question],
		})),
	addOption: (questionIndex: number, option: Option) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].options.push(option)
			return { questions }
		}),
	updateQuestion: (questionIndex: number, question: string) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].question = question
			return { questions }
		}),
	updateOption: (questionIndex: number, optionIndex: number, option: Option) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].options[optionIndex] = option
			return { questions }
		}),
	removeOption: (questionIndex: number, optionIndex: number) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].options.splice(optionIndex, 1)
			return { questions }
		}),
	removeQuestion: (questionIndex: number) =>
		set((state) => {
			const questions = [...state.questions]
			questions.splice(questionIndex, 1)
			return { questions }
		}),
	updateMaxScore: (questionIndex: number, maxScore: number | null) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].maxScore = maxScore
			return { questions }
		}),
}))
