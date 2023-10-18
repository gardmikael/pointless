import { create } from "zustand"

export type Option = {
	title: string
	score: number
}

export type Question = {
	question: string
	options: Option[]
	maxScore: number
}

type State = {
	questions: Question[]
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
	updateMaxScore: (questionIndex: number, maxScore: number) => void
}

export const useQuestionStore = create<State>((set) => ({
	questions: [
		{
			question: `Hovedsteder som begynner på bokstaven "B"`,
			options: [{ title: "Belmopan", score: 11 }],
			maxScore: 100,
		},
	],
	addQuestion: (question: Question) =>
		set((state) => ({
			questions: [...state.questions, question],
		})),
	addOption: (questionIndex: number, option: Option) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].options.push(option)
			return {
				questions,
			}
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
			return {
				questions,
			}
		}),
	removeOption: (questionIndex: number, optionIndex: number) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].options.splice(optionIndex, 1)
			return {
				questions,
			}
		}),
	removeQuestion: (questionIndex: number) =>
		set((state) => {
			const questions = [...state.questions]
			questions.splice(questionIndex, 1)
			return {
				questions,
			}
		}),
	updateMaxScore: (questionIndex: number, maxScore: number) =>
		set((state) => {
			const questions = [...state.questions]
			questions[questionIndex].maxScore = maxScore
			return {
				questions,
			}
		}),
}))
