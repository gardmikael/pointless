import { PlayContextType, Question, Score } from "@/utils/types"
import {
	ChangeEvent,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"
import { useTeams } from "./TeamsContext"
import { useTimer } from "@/hooks/useTimer"

const PlayContext = createContext<PlayContextType | undefined>(undefined)

export function PlayProvider({
	children,
	questions,
}: {
	children: ReactNode
	questions: Question[]
}) {
	const [qIndex, setQIndex] = useState(0)
	const [activeTeamIndex, setActiveTeamIndex] = useState(0)
	const [answer, setAnswer] = useState("")
	const { teams, handleTeamScoreChange } = useTeams()
	const { maxScore, options } = questions[qIndex]

	const onFinish = useCallback(
		(score: number) => {
			if (score === Score.Wrong) {
				score = maxScore
			}
			handleTeamScoreChange(activeTeamIndex, qIndex, score)
		},
		[activeTeamIndex, maxScore, handleTeamScoreChange, qIndex]
	)

	const {
		currentScore,
		timerIsRunning,
		disableStartButton,
		timerHasRun,
		handleStart,
		handleReset,
	} = useTimer({
		maxScore: maxScore,
		options: options,
		answer: answer,
		onFinish: onFinish,
	})
	const handleNextQuestion = () => {
		setActiveTeamIndex(0)
		setQIndex((prev) => prev + 1)
		resetAnswer()
		handleReset()
	}

	const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value)
	}

	const handleNextTeam = () => {
		if (activeTeamIndex === teams.length - 1) {
			setActiveTeamIndex(0)
			handleReset()
			return
		}
		setActiveTeamIndex((prev) => prev + 1)
		resetAnswer()
		handleReset()
	}

	const resetAnswer = () => {
		setAnswer("")
	}

	const allTeamsHasAnsweredAllQuestions = useMemo(
		() =>
			teams.every(
				(team) =>
					team.scores.length === questions.length &&
					team.scores.every((s) => typeof s === "number")
			),
		[teams, questions]
	)

	const isTheLastTeamOnTheList = useMemo(
		() => activeTeamIndex === teams.length - 1,
		[activeTeamIndex, teams]
	)
	const allTeamsHasAnsweredTheCurrentQuestion = useMemo(() => {
		if (teams.length === 0) {
			return false
		}
		return (
			isTheLastTeamOnTheList &&
			teams.every((team) => typeof team.scores[qIndex] === "number")
		)
	}, [teams, qIndex, isTheLastTeamOnTheList])

	const isTheLastQuestionForTheLastTeam =
		qIndex === questions.length - 1 && isTheLastTeamOnTheList

	return (
		<PlayContext.Provider
			value={{
				qIndex,
				questions,
				answer,
				activeTeamIndex,
				handleNextQuestion,
				handleAnswerChange,
				handleNextTeam,
				resetAnswer,
				currentScore,
				timerIsRunning,
				disableStartButton,
				timerHasRun,
				handleStart,
				handleReset,
				allTeamsHasAnsweredAllQuestions,
				isTheLastTeamOnTheList,
				allTeamsHasAnsweredTheCurrentQuestion,
				isTheLastQuestionForTheLastTeam,
			}}
		>
			{children}
		</PlayContext.Provider>
	)
}

export function usePlay(): PlayContextType {
	const context = useContext(PlayContext)

	if (context === undefined) {
		throw new Error("usePlay must be used inside an PlayProvider")
	}
	return context as PlayContextType
}
