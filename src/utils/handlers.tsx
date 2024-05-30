import {
	activeTeamIndex,
	getRandomQuestion,
	qIndex,
	questions,
	teams,
} from "./misc"
import { Option } from "./types"

export const handleAddQuestion = () => {
	const { q, a } = getRandomQuestion()
	const previousMaxScore = questions.value[questions.value.length - 1].maxScore!

	questions.value = [
		...questions.value,
		{
			question: q,
			options: [
				{
					title: a,
					score: previousMaxScore,
				},
			],
			maxScore: previousMaxScore,
		},
	]
}

export const handleOptionChange = (
	qIndex: number,
	oIndex: number,
	newOption: Option
) => {
	const updatedQuestions = questions.value.map((question, qIdx) => {
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

	questions.value = updatedQuestions
}

export const handleAddOption = (index: number) => {
	const maxScore = questions.value[index].maxScore!
	const updatedOptions = [
		...questions.value[index].options,
		{
			title: "Nytt svaralternativ",
			score: maxScore,
		},
	]
	const updatedQuestions = questions.value.map((question, idx) => {
		if (idx === index) {
			return {
				...question,
				options: updatedOptions,
			}
		}
		return question
	})
	questions.value = updatedQuestions
}

export const handleQuestionChange = (qIndex: number, newQuestion: string) => {
	const updatedQuestions = questions.value.map((question, index) => {
		if (index === qIndex) {
			return {
				...question,
				question: newQuestion,
			}
		}
		return question
	})

	questions.value = updatedQuestions
}

export const handleRemoveOption = (qIndex: number, oIndex: number) => {
	const updatedQuestions = questions.value.map((question, qIdx) => {
		if (qIdx === qIndex) {
			const updatedOptions = question.options.filter(
				(option, optIdx) => optIdx !== oIndex
			)

			return {
				...question,
				options: updatedOptions,
			}
		}
		return question
	})

	questions.value = updatedQuestions
}

export const handleRemoveQuestion = (qIndex: number) => {
	const updatedQuestions = questions.value.filter((_, idx) => idx !== qIndex)
	questions.value = updatedQuestions
}

export const handleMaxScoreChange = (
	qIndex: number,
	newMaxScore: number
) => {
	const updatedQuestions = questions.value.map((question, index) => {
		if (index === qIndex) {
			return {
				...question,
				maxScore: newMaxScore,
			}
		}
		return question
	})
	questions.value = updatedQuestions
}

export const handleContinue = () => {
	if (activeTeamIndex.value < teams.value.length - 1) {
		activeTeamIndex.value++
	}
}

export const setScore = (score: number) => {
	const updatedTeams = teams.value.map((team, index) => {
		if (index === activeTeamIndex.value) {
			// Update the scores for the active team
			const updatedScores =
				qIndex.value >= team.scores.length
					? [...team.scores, [score]] // If the array at qIndex doesn't exist, create a new array
					: team.scores.map((innerScores, idx) =>
							idx === qIndex.value ? [...innerScores, score] : innerScores
					  )

			return {
				...team,
				scores: updatedScores,
			}
		}
		return team
	})

	// Update teams.value if the active team index was found
	if (
		activeTeamIndex.value !== -1 &&
		activeTeamIndex.value < updatedTeams.length
	) {
		teams.value = updatedTeams
	} else {
		console.error("Invalid active team index or team not found.")
	}
}
