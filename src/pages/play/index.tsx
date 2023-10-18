import { Option, useQuestionStore } from "@/QuestionStore"
import { CenteredFlexBox } from "@/components/CenteredFlexBox"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { ChangeEvent, useEffect, useRef, useState } from "react"

const PlayPage = () => {
	const { questions } = useQuestionStore()
	const [qIndex, setQIndex] = useState(0)
	const [answer, setAnswer] = useState("")
	const [currentScore, setCurrentScore] = useState(questions[qIndex].maxScore)
	const [timerIsRunning, setTimerIsRunning] = useState(false)
	const [disableStartButton, setDisableStartButton] = useState(false)
	const [targetScore, setTargetScore] = useState(0)

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
				console.log("Wrong answer")
			}
		}, 3000)
	}

	const startCountdown = () => {
		intervalRef.current = window.setInterval(() => {
			decreaseScore()
		}, 100)
	}

	useEffect(() => {
		if (currentScore === targetScore) {
			clear()
			setTimerIsRunning(false)
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

	const Point = ({ isLast }: { isLast: boolean }) => (
		<Box
			className={`point ${isLast ? "last" : ""} ${
				timerIsRunning ? "active" : ""
			}`}
		/>
	)
	const handleReset = () => {
		setCurrentScore(questions[qIndex].maxScore)
		setDisableStartButton(false)
		setAnswer("")
	}

	return (
		<CenteredFlexBox sx={{ width: "100%" }}>
			{/* Score Box */}
			<Box display='flex' flexDirection='column' alignItems='center'>
				<Typography variant='h1'>
					{currentScore === -1 ? "X" : currentScore}
				</Typography>
				<Typography variant='caption'>{questions[qIndex].question}</Typography>
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
			<Box
				width='100%'
				sx={{
					p: 2,
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Button
					variant='contained'
					color='primary'
					onClick={handlePreviousQuestion}
					disabled={qIndex === 0}
				>
					Forrige spørsmål
				</Button>
				<Box display='flex' flexDirection='column'>
					<TextField
						onChange={handdleAnswerChange}
						value={answer}
						autoComplete='false'
						autoFocus={true}
						disabled={disableStartButton}
					/>
					<Button
						variant='contained'
						onClick={handleStart}
						disabled={disableStartButton}
					>
						Start
					</Button>
					<Button variant='outlined' onClick={handleReset}>
						Reset
					</Button>
				</Box>
				<Button
					variant='contained'
					color='primary'
					onClick={handleNextQuestion}
					disabled={qIndex === questions.length - 1}
				>
					Neste spørsmål
				</Button>
			</Box>
		</CenteredFlexBox>
	)
}

export default PlayPage
