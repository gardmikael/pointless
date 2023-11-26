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
import { ChangeEvent, useEffect, useRef, useState } from "react"
import useSound from "use-sound"
import { Teams } from "@/components/play/Teams"
import { Countdown } from "@/components/play/Countdown"
import { mode } from "@/pages"
import { BackToQuestions } from "./BackToQuestions"
import {
	COUNT_DOWN_DURATION,
	activeTeamIndex,
	allTeamsHasAnsweredAllQuestions,
	allTeamsHasAnsweredTheCurrentQuestion,
	isTheLastTeamOnTheList,
	qIndex,
	questions,
	showTeams,
	teams,
} from "@/utils/misc"
import { Option } from "@/utils/types"
import { Answers } from "./Answers"
import { Navigation } from "./Navigation"
import { handleContinue, setScore } from "@/utils/handlers"

const Play = () => {
	const [answer, setAnswer] = useState("")
	const { question, maxScore } = questions.value[qIndex.value]
	const [currentScore, setCurrentScore] = useState(maxScore!)
	const [timerIsRunning, setTimerIsRunning] = useState(false)
	const [disableStartButton, setDisableStartButton] = useState(false)
	const [targetScore, setTargetScore] = useState(0)
	const [showReset, setShowReset] = useState(false)
	const [showAnswers, setShowAnswers] = useState(false)

	const [playCountdownAudio, { stop: stopCountdownAudio }] = useSound(
		"/audio/countdown.mp3"
	)
	const [playWrongAudio] = useSound("/audio/wrong.mp3")
	const [playStopAudio] = useSound("/audio/stop.mp3", { volume: 0.5 })
	const [playPointlessAudio] = useSound("/audio/pointless.mp3")

	let intervalRef = useRef<NodeJS.Timer | number | null>(null)

	const clear = () => {
		window.clearInterval(intervalRef.current as number)
	}

	const decreaseScore = () => setCurrentScore((prev) => prev - 1)

	const handleStart = () => {
		if (timerIsRunning) {
			return
		}
		setDisableStartButton(true)
		const correctAnswer = questions.value[qIndex.value].options.find(
			(option) => option.title.toLowerCase() === answer.toLowerCase()
		)
		const pointless = answer.at(-1) === " "

		setTimeout(() => {
			if (pointless || !!correctAnswer) {
				const targetScore = pointless ? 0 : (correctAnswer as Option).score!
				setTargetScore(targetScore)
				if (targetScore === questions.value[qIndex.value].maxScore!) {
					playStopAudio()
					setShowReset(true)
					setScore(targetScore)
					return
				}
				setTimerIsRunning(true)
				startCountdown(targetScore)
			} else {
				setCurrentScore(-1)
				playWrongAudio()
				setShowReset(true)
				setScore(questions.value[qIndex.value].maxScore!)
			}
		}, 10)
	}

	const startCountdown = (targetScore: number) => {
		if (currentScore === targetScore) {
			playStopAudio()
			setShowReset(true)
			return
		}
		playCountdownAudio()
		intervalRef.current = window.setInterval(() => {
			decreaseScore()
		}, COUNT_DOWN_DURATION / maxScore!)
	}

	const handleReset = () => {
		setShowReset(false)
		setCurrentScore(maxScore!)
		setDisableStartButton(false)
		setAnswer("")
		setShowAnswers(false)
	}

	const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value)
	}

	const handleNewRound = () => {
		teams.value = teams.value.reverse()
		activeTeamIndex.value = 0
		handleReset()
	}

	useEffect(() => {
		if (currentScore === targetScore) {
			if (targetScore === 0) {
				playPointlessAudio()
			} else {
				stopCountdownAudio()
				playStopAudio()
			}
			clear()
			setTimerIsRunning(false)
			setShowReset(true)
			setScore(targetScore)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentScore])

	useEffect(() => {
		setCurrentScore(maxScore!)
	}, [maxScore])

	useEffect(() => {
		handleReset()
		setCurrentScore(questions.value[qIndex.value].maxScore!)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qIndex.value, activeTeamIndex.value])

	useEffect(() => {
		return () => {
			clear()
		}
	}, [])

	return (
		<CenteredFlexBox sx={{ p: 2 }}>
			<Grid container>
				<Grid item md={3}>
					<BackToQuestions />
				</Grid>
				<Grid item md={6}>
					<Countdown
						currentScore={currentScore}
						maxScore={maxScore!}
						isRunning={timerIsRunning}
					/>
					<Box sx={{ textAlign: "center", my: 2 }}>
						<Typography>Spørsmål {qIndex.value + 1}</Typography>
						<Typography variant='h5'>{question}</Typography>
					</Box>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='center'
						gap={2}
					>
						<TextField
							onChange={handleAnswerChange}
							value={answer}
							autoComplete='off'
							autoFocus={true}
							disabled={disableStartButton}
							sx={{
								caretColor: "transparent",
							}}
						/>
						<Box>
							{showReset ? (
								<Button
									variant='contained'
									color='success'
									onClick={handleContinue}
									disabled={isTheLastTeamOnTheList.value}
								>
									Fortsett
								</Button>
							) : (
								<Button
									variant='contained'
									onClick={handleStart}
									disabled={disableStartButton}
									sx={{ width: 100, mb: 3 }}
								>
									Start
								</Button>
							)}
						</Box>
					</Box>
				</Grid>
				<Grid item md={3} width={"100%"}>
					<FormGroup>
						<FormControlLabel
							checked={showTeams.value}
							onChange={() => {
								showTeams.value = !showTeams.value
							}}
							control={<Switch />}
							label={`Vis lag`}
						/>
					</FormGroup>
					{showTeams.value && <Teams />}
					<Box
						sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
					>
						{!showAnswers &&
							allTeamsHasAnsweredTheCurrentQuestion.value &&
							isTheLastTeamOnTheList.value && (
								<Button
									sx={{ my: 2 }}
									variant='outlined'
									onClick={() => setShowAnswers(true)}
								>
									Vis svar
								</Button>
							)}
						{allTeamsHasAnsweredTheCurrentQuestion.value &&
							isTheLastTeamOnTheList.value && (
								<Button
									color='success'
									variant='contained'
									sx={{ my: 2 }}
									onClick={handleNewRound}
								>
									Ny runde
								</Button>
							)}
					</Box>
					{showAnswers && <Answers />}

					{allTeamsHasAnsweredTheCurrentQuestion.value &&
						isTheLastTeamOnTheList.value && <Navigation />}
					{allTeamsHasAnsweredAllQuestions.value &&
						isTheLastTeamOnTheList.value && (
							<Button
								onClick={() => {
									mode.value = "podium"
								}}
							>
								Vis podium
							</Button>
						)}
				</Grid>
			</Grid>
		</CenteredFlexBox>
	)
}

export default Play
