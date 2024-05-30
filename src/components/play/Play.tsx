import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	Switch,
	TextField,
	Typography,
} from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { Teams } from "@/components/play/Teams"
import { Countdown } from "@/components/play/Countdown"
import { BackToQuestions } from "./BackToQuestions"
import {
	Modes,
	activeTeamIndex,
	allTeamsHasAnsweredAllQuestions,
	allTeamsHasAnsweredTheCurrentQuestion,
	isTheLastTeamOnTheList,
	mode,
	qIndex,
	questions,
	showTeams,
	teams,
} from "@/utils/misc"
import { Answers } from "./Answers"
import { Navigation } from "./Navigation"
import { handleContinue } from "@/utils/handlers"
import { useTimer } from "@/hooks/useTimer"
import { signal } from "@preact/signals-react"
import QuestionAnswerSection from "./QuestionAnswerSection"
import ControlsSection from "./ControlsSection"

export const answer = signal("")

const Play = () => {
	const { maxScore } = questions.value[qIndex.value]
	
	const {
        currentScore,
        timerIsRunning,
        disableStartButton,
        showReset,
        handleStart,
        setCurrentScore,
        handleReset
    } = useTimer()

	const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
		answer.value = event.target.value
	}

	const handleNewRound = () => {
		teams.value = teams.value.reverse()
		activeTeamIndex.value = 0
		handleReset()
	}

	useEffect(() => {
		setCurrentScore(maxScore!)
	}, [maxScore])

	useEffect(() => {
		handleReset()
		setCurrentScore(questions.value[qIndex.value].maxScore!)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qIndex.value, activeTeamIndex.value])

	return (
		<CenteredFlexBox sx={{ p: 2 }}>
			<Grid container>
				<Grid item md={3}>
					<BackToQuestions />
				</Grid>
				<Grid item md={6}>
					<Countdown
						currentScore={currentScore}
						isRunning={timerIsRunning}
					/>
					<QuestionAnswerSection
                        disableStartButton={disableStartButton}
                        showReset={showReset}
                        handleAnswerChange={handleAnswerChange}
                        handleStart={handleStart}
                        handleContinue={handleContinue}
                    />
				</Grid>
				<Grid item md={3} width={"100%"}>
					<ControlsSection />
				</Grid>
			</Grid>
		</CenteredFlexBox>
	)
}

export default Play
