import { Box, Button, FormControlLabel, FormGroup, Switch } from "@mui/material"
import { Teams } from "./Teams"
import { Answers } from "./Answers"
import { Mode, Option } from "@/utils/types"
import { useApp } from "../../context/AppContext"
import { useState, useEffect } from "react"
import { Navigation } from "./Navigation"

type RightColumnProps = {
	options: Option[]
	allTeamsHasAnsweredTheCurrentQuestion: boolean
	isTheLastTeamOnTheList: boolean
	isTheLastQuestionForTheLastTeam: boolean
	allTeamsHasAnsweredAllQuestions: boolean
	handleNextTeam: () => void
}

export const RightColumn = ({
	options,
	allTeamsHasAnsweredTheCurrentQuestion,
	isTheLastTeamOnTheList,
	isTheLastQuestionForTheLastTeam,
	allTeamsHasAnsweredAllQuestions,
}: RightColumnProps) => {
	const { setMode } = useApp()
	const [showAnswers, setShowAnswers] = useState(false)
	const [showTeams, setShowTeams] = useState(true)

	// Reset showAnswers når vi går til neste spørsmål
	useEffect(() => {
		setShowAnswers(false)
	}, [allTeamsHasAnsweredTheCurrentQuestion])

	const canShowAnswers =
		allTeamsHasAnsweredTheCurrentQuestion && isTheLastTeamOnTheList

	return (
		<Box p={2}>
			<FormGroup>
				<FormControlLabel
					checked={showTeams}
					onChange={() => setShowTeams(!showTeams)}
					control={<Switch />}
					label={`Vis lag`}
				/>
			</FormGroup>
			{showTeams && <Teams />}
			{canShowAnswers && (
				<FormControlLabel
					checked={showAnswers}
					onChange={() => setShowAnswers(!showAnswers)}
					control={<Switch />}
					label={`Vis svar`}
					disabled={!allTeamsHasAnsweredTheCurrentQuestion}
				/>
			)}
			{canShowAnswers && showAnswers && <Answers options={options} />}

			{allTeamsHasAnsweredTheCurrentQuestion &&
				isTheLastTeamOnTheList &&
				!isTheLastQuestionForTheLastTeam && (
					<Navigation isTheLastQuestion={false} />
				)}

			{allTeamsHasAnsweredAllQuestions && isTheLastTeamOnTheList && (
				<Button onClick={() => setMode(Mode.Podium)} variant='outlined'>
					Vis podium
				</Button>
			)}
		</Box>
	)
}
