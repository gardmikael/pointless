import { Option, useQuestionStore } from "@/QuestionStore"
import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import {
	Box,
	Button,
	IconButton,
	Stack,
	TextField,
	Typography,
} from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import RefreshIcon from "@mui/icons-material/Refresh"
import useSound from "use-sound"

const COUNT_DOWN_DURATION = 7000 // 7 seconds
const PlayPage = () => {
	const { questions } = useQuestionStore()
	const [qIndex, setQIndex] = useState(0)
	const [answer, setAnswer] = useState("")
	const [currentScore, setCurrentScore] = useState(questions[qIndex].maxScore)
	const [timerIsRunning, setTimerIsRunning] = useState(false)
	const [disableStartButton, setDisableStartButton] = useState(false)
	const [targetScore, setTargetScore] = useState(0)
	const [showReset, setShowReset] = useState(false)
	const [playCountdownAudio, { stop: stopCountdownAudio }] = useSound(
		"/audio/countdown.mp3"
	)
	const [playWrongAudio] = useSound("/audio/wrong.mp3")
	const [playStopAudio] = useSound("/audio/stop.mp3", { volume: 1.5 })

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
		const correctAnswer = questions[qIndex].options.find(
			(option) => option.title.toLowerCase() === answer.toLowerCase()
		)
		const pointless = answer.at(-1) === " "

		setTimeout(() => {
			if (pointless || correctAnswer) {
				setTargetScore(pointless ? 0 : (correctAnswer as Option).score)
				setTimerIsRunning(true)
				startCountdown()
			} else {
				setCurrentScore(-1)
				playWrongAudio()
				setShowReset(true)
			}
		}, 3000)
	}

	const startCountdown = () => {
		playCountdownAudio()
		intervalRef.current = window.setInterval(() => {
			decreaseScore()
		}, COUNT_DOWN_DURATION / questions[qIndex].maxScore)
	}

	useEffect(() => {
		if (currentScore === targetScore) {
			stopCountdownAudio()
			if (targetScore !== 0) {
				playStopAudio()
			}
			clear()
			setTimerIsRunning(false)
			setShowReset(true)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentScore])

	useEffect(() => {
		setCurrentScore(questions[qIndex].maxScore)
	}, [qIndex, questions])

	const handleNextQuestion = () => {
		if (qIndex < questions.length - 1) {
			setQIndex(qIndex + 1)
		}
	}

	const handlePreviousQuestion = () => {
		if (qIndex > 0) {
			setQIndex(qIndex - 1)
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
		setCurrentScore(questions[qIndex].maxScore)
		setDisableStartButton(false)
		setAnswer("")
	}

	return (
		<CenteredFlexBox sx={{ width: "100%" }}>
			{/* Score Box */}
			<Box display='flex' flexDirection='column' alignItems='center'>
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
					}}
				>
					<Typography
						variant='h1'
						sx={{
							fontWeight: 700,
							color: `${currentScore === -1 ? "red" : "yellow"}`,
						}}
					>
						{currentScore === -1 ? "X" : currentScore}
					</Typography>
				</Box>
			</Box>
			<Stack direction='column-reverse' gap={0.25} height={500}>
				{Array.from(
					{
						length:
							currentScore === -1 ? questions[qIndex].maxScore : currentScore,
					},
					(_, i) => (
						<Point key={i} isLast={i === currentScore - 1} />
					)
				)}
			</Stack>
			<Box>
				<Typography variant='caption'>{questions[qIndex].question}</Typography>
			</Box>
			<Box
				width='100%'
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					alignItems: "center",
				}}
			>
				<Box display='flex' justifyContent={"center"}>
					{qIndex !== 0 && (
						<Button
							variant='contained'
							color='primary'
							onClick={handlePreviousQuestion}
							disabled={qIndex === 0}
						>
							Forrige spørsmål
						</Button>
					)}
				</Box>

				<Box display='flex' flexDirection='column' alignItems='center' gap={2}>
					<TextField
						onChange={handdleAnswerChange}
						value={answer}
						autoComplete='false'
						autoFocus={true}
						disabled={disableStartButton}
						sx={{
							caretColor: "transparent",
						}}
					/>
					<Button
						variant='contained'
						onClick={handleStart}
						disabled={disableStartButton}
						sx={{ width: 100 }}
					>
						Start
					</Button>
					{showReset && (
						<IconButton onClick={handleReset}>
							<RefreshIcon />
						</IconButton>
					)}
				</Box>
				<Box display='flex' justifyContent={"center"}>
					{qIndex !== questions.length - 1 && (
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
			</Box>
		</CenteredFlexBox>
	)
}

export default PlayPage
