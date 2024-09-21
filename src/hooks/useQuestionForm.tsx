import { randomQuestions } from "@/utils/data"
import { Option, Question } from "@/utils/types"
import { useRef, useState } from "react"

const getRandomQuestion = () => {
	const { q, a } =
		randomQuestions[Math.floor(Math.random() * randomQuestions.length)]
	const randomAnswer = a[Math.floor(Math.random() * a.length)]
	const randomScore = Math.floor(Math.random() * 100) + 1
	return { q: q, answer: randomAnswer, score: randomScore }
}

export const useQuestionForm = () => {
	const [questions, setQuestions] = useState<Question[]>([])
	const [formIsValid, setFormIsValid] = useState(true)

	const formRef = useRef<HTMLFormElement | null>(null)

	const checkFormValidity = () => {
		const isValid = !!formRef?.current?.checkValidity()
		setFormIsValid(isValid)
	}

	const hasError = (id: string) => {
		const element = formRef?.current?.querySelector(
			`#${id}`
		) as HTMLInputElement

		return element ? !element.checkValidity() : false
	}

	const handleAddRandomQuestion = () => {
		const { q, answer, score } = getRandomQuestion()
		const maxScore = questions.length
			? questions[questions.length - 1].maxScore
			: score

		const updatedQuestions = [
			...questions,
			{
				question: q,
				options: [
					{
						title: answer,
						score: Math.floor(Math.random() * maxScore + 1),
					},
				],
				maxScore: maxScore,
			},
		]
		setQuestions(updatedQuestions)
	}

	const getNewRandomOption = (
		question: string,
		usedOptions: string[]
	): string => {
		let newOption = "Nytt svaralternativ"

		const questionIndex = randomQuestions.findIndex((q) => q.q === question)

		if (questionIndex !== -1) {
			const options = randomQuestions[questionIndex].a.filter(
				(o) => !usedOptions.includes(o)
			)

			if (options.length > 0) {
				const randomOption = options[Math.floor(Math.random() * options.length)]
				newOption = randomOption
			}
		}

		return newOption
	}

	const handleOptionChange = (
		qIndex: number,
		oIndex: number,
		newOption: Option
	) => {
		const updatedQuestions = questions.map((question, qIdx) => {
			if (qIdx === qIndex) {
				const updatedOptions = question.options.map((option, optIdx) => {
					if (optIdx === oIndex) {
						return newOption
					}
					return option
				})

				return {
					...question,
					options: updatedOptions,
				}
			}
			return question
		})
		setQuestions(updatedQuestions)
	}

	const handleAddOption = (index: number) => {
		const maxScore = questions[index].maxScore
		const { question, options } = questions[index]

		const newOptionText = getNewRandomOption(
			question,
			options.map((o) => o.title)
		)
		const newOption = {
			title: newOptionText,
			score: Math.floor(Math.random() * maxScore + 1),
		}
		const updatedOptions = [...questions[index].options, newOption]
		const updatedQuestions = questions.map((question, idx) => {
			if (idx === index) {
				return {
					...question,
					options: updatedOptions,
				}
			}
			return question
		})
		setQuestions(updatedQuestions)
	}

	const handleQuestionChange = (qIndex: number, newQuestion: string) => {
		const updatedQuestions = questions.map((question, index) => {
			if (index === qIndex) {
				return {
					...question,
					question: newQuestion,
				}
			}
			return question
		})

		setQuestions(updatedQuestions)
	}

	const handleRemoveOption = (qIndex: number, oIndex: number) => {
		const updatedOptions = questions[qIndex].options.filter(
			(option, index) => index !== oIndex
		)
		const updatedQuestions = questions.map((question, index) => {
			if (index === qIndex) {
				return {
					...question,
					options: updatedOptions,
				}
			}
			return question
		})
		setQuestions(updatedQuestions)
	}

	const handleMaxScoreChange = (qIndex: number, newMaxScore: number) => {
		const updatedQuestions = questions.map((question, index) => {
			if (index === qIndex) {
				return {
					...question,
					maxScore: newMaxScore,
				}
			}
			return question
		})
		setQuestions(updatedQuestions)
	}

	const handleRemoveQuestion = (qIndex: number) => {
		const updatedQuestions = questions.filter((_, index) => index !== qIndex)
		setQuestions(updatedQuestions)
	}

	return {
		questions,
		formRef,
		formIsValid,
		setQuestions,
		checkFormValidity,
		hasError,
		handleAddRandomQuestion,
		handleOptionChange,
		handleAddOption,
		handleQuestionChange,
		handleRemoveOption,
		handleRemoveQuestion,
		handleMaxScoreChange,
		getNewRandomOption,
	}
}
