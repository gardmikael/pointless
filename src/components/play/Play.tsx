import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import {
	Box,
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	List,
	ListItem,
	Paper,
	Switch,
	TextField,
	Typography,
} from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import useSound from "use-sound"
import { Teams } from "@/components/play/Teams"
import { Countdown } from "@/components/play/Countdown"
import { mode } from "@/pages"
import { signal } from "@preact/signals-react"
import { Option, questions } from "../create/CreateForm"
import { BackToQuestions } from "./BackToQuestions"

const COUNT_DOWN_DURATION = 6700

type Team = {
	name: string
	scores: number[]
}

export const teams = signal<Team[]>([
	{
		name: "Lag 1",
		scores: [],
	},
])

export const qIndex = signal(0)

export const activeTeamIndex = signal(0)

const showTeams = signal(true)

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

	const decreaseScore = () => setCurrentScore((prev) => prev! - 1)

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
			if (pointless || correctAnswer) {
				const targetScore = pointless ? 0 : (correctAnswer as Option).score!
				setTargetScore(targetScore)
				setTimerIsRunning(true)
				startCountdown(targetScore)
			} else {
				setCurrentScore(-1)
				playWrongAudio()
				setShowReset(true)
				setScore(questions.value[qIndex.value].maxScore!)
			}
		}, 3000)
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

	const setScore = (score: number) => {
		const updatedTeams = teams.value.map((team, index) => {
			if (index === activeTeamIndex.value) {
				return {
					...team,
					scores: [...team.scores, score],
				}
			}
			return team
		})
		teams.value = updatedTeams
	}

	const handleReset = () => {
		setShowReset(false)
		setCurrentScore(maxScore!)
		setDisableStartButton(false)
		setAnswer("")
		setShowAnswers(false)
	}

	const handleContinue = () => {
		if (activeTeamIndex.value < teams.value.length - 1) {
			activeTeamIndex.value++
		}
	}

	const handlePreviousQuestion = () => {
		if (qIndex.value > 0) {
			qIndex.value--
			activeTeamIndex.value = 0
		}
	}
	const handleNextQuestion = () => {
		if (qIndex.value < questions.value.length - 1) {
			qIndex.value++
			activeTeamIndex.value = 0
		}
	}

	const handdleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value)
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

	const allTeamsHasAnsweredTheCurrentQuestion = teams.value.every(
		(team) => team.scores[qIndex.value] !== undefined
	)

	const allTeamsHasAnsweredAllQuestions = teams.value.every(
		(team) => team.scores.length === questions.value.length
	)

	const lastQuestion = qIndex.value === questions.value.length - 1

	return (
		<>
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
								onChange={handdleAnswerChange}
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
									activeTeamIndex.value !== teams.value.length - 1 && (
										<Button
											variant='contained'
											color='success'
											onClick={handleContinue}
										>
											Fortsett
										</Button>
									)
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

								{showReset && (
									<IconButton onClick={handleReset}>
										<RefreshIcon />
									</IconButton>
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
								control={<Switch defaultChecked />}
								label={`Vis lag`}
							/>
						</FormGroup>
						{showTeams.value && <Teams />}
						{!showAnswers && allTeamsHasAnsweredTheCurrentQuestion && (
							<Button
								sx={{ my: 2 }}
								variant='outlined'
								onClick={() => setShowAnswers(true)}
							>
								Vis svar
							</Button>
						)}
						{showAnswers && (
							<Paper
								elevation={3}
								sx={{
									p: 2,
									mt: 2,
								}}
							>
								<List>
									{questions.value[qIndex.value].options
										.sort((a, b) => b.score! - a.score!)
										.map(({ title, score }, index) => (
											<ListItem key={`q-${qIndex}-option-${index}`}>
												<Typography variant='caption'>
													{`${title} (${score})`}
												</Typography>
											</ListItem>
										))}
								</List>
							</Paper>
						)}

						<Box display='flex' justifyContent={"center"} sx={{ m: 2 }}>
							{allTeamsHasAnsweredTheCurrentQuestion && !lastQuestion && (
								<Box sx={{ display: "flex", gap: 2 }}>
									<Button
										variant='contained'
										color='primary'
										onClick={handlePreviousQuestion}
										disabled={qIndex.value === 0}
									>
										Forrige spørsmål
									</Button>
									<Button
										variant='contained'
										color='primary'
										onClick={handleNextQuestion}
									>
										Neste spørsmål
									</Button>
								</Box>
							)}
						</Box>
						{allTeamsHasAnsweredAllQuestions && (
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
		</>
	)
}

export default Play
