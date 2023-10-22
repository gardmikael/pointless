import { Option, useQuestionStore } from "@/QuestionStore"
import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import {
	Box,
	Button,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import useSound from "use-sound"
import { useRouter } from "next/router"
import { Teams } from "@/components/play/Teams"

const COUNT_DOWN_DURATION = 6700 // 7 seconds
const PlayPage = () => {
	const {
		questions,
		activeTeamIndex,
		updateActiveTeamIndex,
		updateTeam,
		teams,
		qIndex,
		setQIndex,
	} = useQuestionStore()

	const [answer, setAnswer] = useState("")
	const { question, maxScore } = questions[qIndex]
	const [currentScore, setCurrentScore] = useState(maxScore!)
	const [timerIsRunning, setTimerIsRunning] = useState(false)
	const [disableStartButton, setDisableStartButton] = useState(false)
	const [targetScore, setTargetScore] = useState(0)
	const [showReset, setShowReset] = useState(false)
	const [playCountdownAudio, { stop: stopCountdownAudio }] = useSound(
		"/audio/countdown.mp3"
	)
	const [playWrongAudio] = useSound("/audio/wrong.mp3")
	const [playStopAudio] = useSound("/audio/stop.mp3", { volume: 0.7 })
	const [playPointlessAudio] = useSound("/audio/pointless.mp3")
	const router = useRouter()

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
		const correctAnswer = questions[qIndex].options.find(
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
				setScore(questions[qIndex].maxScore!)
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
		const team = teams[activeTeamIndex]
		team.scores[qIndex] = score
		updateTeam(activeTeamIndex, team)
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

	const handleNextQuestion = () => {
		if (qIndex < questions.length - 1) {
			teams.forEach((team) => {
				team.scores.push(-1)
			})
			setQIndex(qIndex + 1)
			updateActiveTeamIndex(0)
		}
	}

	const handdleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAnswer(event.target.value)
	}

	useEffect(() => {
		return () => {
			clear()
		}
	}, [])

	const Point = ({ isLast }: { isLast: boolean }) => (
		<Box
			className={`point ${isLast ? "last" : ""} ${
				timerIsRunning ? "active" : ""
			}`}
		/>
	)
	const handleReset = () => {
		setShowReset(false)
		setCurrentScore(maxScore!)
		setDisableStartButton(false)
		setAnswer("")
	}

	const handleContinue = () => {
		if (activeTeamIndex < teams.length - 1) {
			updateActiveTeamIndex(activeTeamIndex + 1)
		}
	}

	useEffect(() => {
		handleReset()
		setCurrentScore(questions[qIndex].maxScore!)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [qIndex, activeTeamIndex])

	return (
		<>
			<CenteredFlexBox sx={{ p: 2, width: "100%" }}>
				<Grid container>
					<Grid item md={3}>
						<Button
							variant='outlined'
							size='small'
							onClick={() => router.push("/")}
						>
							Tilbake til spørsmål
						</Button>
					</Grid>
					<Grid item md={6}>
						<Box display='flex' flexDirection='column' alignItems='center'>
							<Box className='outer-container'>
								<Box
									className='inner-container'
									sx={{ border: "3px solid", mx: 2 }}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											border: "2px solid",
											p: 1,
											borderRadius: "50%",
											width: 200,
											bgcolor: "#323541",
											m: 1,
										}}
									>
										<Typography
											variant='h2'
											sx={{
												fontWeight: 700,
												color: `${currentScore === -1 ? "red" : "yellow"}`,
											}}
											className={currentScore === 0 ? "glow" : ""}
										>
											{currentScore === -1
												? "X"
												: currentScore === 0
												? "POINTLESS"
												: currentScore}
										</Typography>
									</Box>
									<Stack
										direction='column-reverse'
										gap={0.25}
										height={500}
										sx={{ mx: 1, alignItems: "center" }}
									>
										{Array.from(
											{
												length: currentScore === -1 ? maxScore! : currentScore,
											},
											(_, i) => (
												<Point key={i} isLast={i === currentScore - 1} />
											)
										)}
									</Stack>
								</Box>
							</Box>
						</Box>
						<Box sx={{ textAlign: "center" }}>
							<Typography variant='caption'>{question}</Typography>
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
									activeTeamIndex !== teams.length - 1 && (
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
										sx={{ width: 100 }}
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
						<Box
							width='100%'
							sx={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								alignItems: "center",
							}}
						></Box>
					</Grid>
					<Grid item md={3}>
						<Teams />
						<Box display='flex' justifyContent={"center"}>
							{qIndex !== questions.length - 1 &&
								activeTeamIndex === teams.length - 1 &&
								teams[teams.length - 1].scores[qIndex] !== -1 && (
									<Button
										variant='contained'
										color='primary'
										onClick={handleNextQuestion}
										disabled={qIndex === questions.length - 1}
									>
										Neste spørsmål
									</Button>
								)}
						</Box>
					</Grid>
				</Grid>
			</CenteredFlexBox>
		</>
	)
}

export default PlayPage
