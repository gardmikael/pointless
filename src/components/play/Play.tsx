import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
} from "@mui/material"
import { Teams } from "@/components/play/Teams"
import { Countdown } from "@/components/play/Countdown"
import { BackToQuestions } from "./BackToQuestions"
import { Mode, PlayProps } from "@/utils/types"
import { Answers } from "./Answers"
import { Navigation } from "./Navigation"
import { useApp } from "../../context/AppContext"
import { usePlay } from "../../context/PlayContext"
import { useEffect, useState } from "react"
import { QuestionAnswerSection } from "./QuestionAnswerSection"

const Play = ({ questions }: PlayProps) => {
	const { setMode } = useApp()
	const {
		qIndex,
		activeTeamIndex,
		handleNextTeam,
		resetAnswer,
		currentScore,
		timerIsRunning,
		allTeamsHasAnsweredTheCurrentQuestion,
		isTheLastTeamOnTheList,
		isTheLastQuestionForTheLastTeam,
		allTeamsHasAnsweredAllQuestions,
		handleReset,
	} = usePlay()

	const { maxScore, options } = questions[qIndex]

	const [showAnswers, setShowAnswers] = useState(false)
	const [showTeams, setShowTeams] = useState(true)

	useEffect(() => {
		handleReset()
		resetAnswer()
		setShowAnswers(false)
	}, [activeTeamIndex, handleReset])

	if (questions.length === 0) {
		return <div>Ingen spørsmål</div>
	}

	return (
		<CenteredFlexBox sx={{ p: 2 }}>
			<Grid container>
				<Grid item md={3}>
					<BackToQuestions />
				</Grid>
				<Grid item md={6}>
					<Countdown
						currentScore={currentScore}
						maxScore={maxScore}
						isRunning={timerIsRunning}
					/>
					<QuestionAnswerSection />
				</Grid>
				<Grid item md={3} width={"100%"}>
					<FormGroup>
						<FormControlLabel
							checked={showTeams}
							onChange={() => setShowTeams(!showTeams)}
							control={<Switch />}
							label={`Vis lag`}
						/>
					</FormGroup>
					{showTeams && <Teams />}
					<Box
						sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
					>
						{allTeamsHasAnsweredTheCurrentQuestion && (
							<Button
								sx={{ my: 2 }}
								variant='outlined'
								onClick={() => setShowAnswers(true)}
							>
								Vis svar
							</Button>
						)}
						{allTeamsHasAnsweredTheCurrentQuestion &&
							isTheLastTeamOnTheList && (
								<Button
									color='success'
									variant='contained'
									sx={{ my: 2 }}
									onClick={handleNextTeam}
								>
									Ny runde
								</Button>
							)}
					</Box>
					{showAnswers && <Answers options={options} />}

					{allTeamsHasAnsweredTheCurrentQuestion &&
						isTheLastTeamOnTheList &&
						!isTheLastQuestionForTheLastTeam && (
							<Navigation isTheLastQuestion={false} />
						)}

					{allTeamsHasAnsweredAllQuestions && isTheLastTeamOnTheList && (
						<Button onClick={() => setMode(Mode.Podium)}>Vis podium</Button>
					)}
				</Grid>
			</Grid>
		</CenteredFlexBox>
	)
}

export default Play
