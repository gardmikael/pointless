import { ChangeEvent } from "react"

export enum Score {
	Pointless = 0,
	Wrong = -1,
}

export enum Mode {
	Questions = "questions",
	Teams = "teams",
	Play = "play",
	Podium = "podium",
}

export type Team = {
	name: string
	scores: number[][]
}

export type Option = {
	title: string
	score: number
}

export type Question = {
	question: string
	options: Option[]
	maxScore: number
}

export type QuestionData = {
	question: string
	options: string
	maxScore: string
}

export type SampleQuestion = {
	q: string
	a: string[]
}

export type PlaceInfo = {
	[key: number]: {
		className: string
		text: string
	}
}

export type AnswersProps = {
	options: Option[]
}

export type CountdownProps = {
	currentScore: number
	maxScore: number
	isRunning: boolean
}

export type TimerProps = {
	maxScore: number
	options: Option[]
	answer: string
	onFinish: (score: number) => void
}

export type PlayProps = {
	questions: Question[]
}

export type FileImporterProps = {
	callback: (questions: Question[]) => void
}

export type ImporterProps = {
	callback?: (questions: Question[]) => void
}

export type AppContextType = {
	mode: Mode
	setMode: (mode: Mode) => void
}

export type TeamsContextType = {
	teams: Team[]
	handleTeamChange: (
		index: number,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	addTeam: () => void
	deleteTeam: (index: number) => void
	reverseTeamOrder: () => void
	handleTeamScoreChange: (
		teamIndex: number,
		scoreIndex: number,
		value: number
	) => void
	addNewQuestionArrayForAllTeams: () => void
}

export type PlayContextType = {
	qIndex: number
	answer: string
	questions: Question[]
	activeTeamIndex: number
	handleNextQuestion: () => void
	handleAnswerChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleNextTeam: () => void
	resetAnswer: () => void
	currentScore: number
	timerIsRunning: boolean
	disableStartButton: boolean
	timerHasRun: boolean
	handleStart: () => void
	handleReset: () => void
	allTeamsHasAnsweredAllQuestions: boolean
	isTheLastTeamOnTheList: boolean
	allTeamsHasAnsweredTheCurrentQuestion: boolean
	isTheLastQuestionForTheLastTeam: boolean
}

export type QuestionFormContextType = {
	questions: Question[]
	formRef: React.RefObject<HTMLFormElement>
	formIsValid: boolean
	setQuestions: (questions: Question[]) => void
	handleAddRandomQuestion: () => void
	handleOptionChange: (
		qIndex: number,
		oIndex: number,
		newOption: Option
	) => void
	handleAddOption: (index: number) => void
	handleQuestionChange: (qIndex: number, newQuestion: string) => void
	handleRemoveOption: (qIndex: number, oIndex: number) => void
	checkFormValidity: () => void
	handleRemoveQuestion: (qIndex: number) => void
	handleMaxScoreChange: (qIndex: number, newMaxScore: number) => void
	hasError: (id: string) => boolean
	getNewRandomOption: (question: string, usedOptions: string[]) => string
}

export type QuestionsContextType = {
	questions: Question[]
	formIsValid: boolean
	formRef: React.RefObject<HTMLFormElement>
	handleAddRandomQuestion: () => void
	handleOptionChange: (
		qIndex: number,
		oIndex: number,
		newOption: Option
	) => void
	handleAddOption: (index: number) => void
	handleQuestionChange: (qIndex: number, newQuestion: string) => void
	handleRemoveOption: (qIndex: number, oIndex: number) => void
	handleRemoveQuestion: (qIndex: number) => void
	handleMaxScoreChange: (qIndex: number, newMaxScore: number) => void
	hasError: (id: string) => boolean
	checkFormValidity: () => void
	setQuestions: (questions: Question[]) => void
}
