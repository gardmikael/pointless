import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Score, TimerProps } from "@/utils/types"
import useSound from "use-sound"

export const COUNT_DOWN_DURATION = 6700

export const useTimer = ({
	maxScore,
	options,
	answer,
	onFinish,
}: TimerProps) => {
	const [playCountdownAudio, { stop: stopCountdownAudio }] = useSound(
		"/audio/countdown.mp3"
	)
	const [playWrongAudio] = useSound("/audio/wrong.mp3")
	const [playStopAudio] = useSound("/audio/stop.mp3")
	const [playPointlessAudio] = useSound("/audio/pointless.mp3")

	const [currentScore, setCurrentScore] = useState<number>(maxScore)
	const [timerIsRunning, setTimerIsRunning] = useState(false)
	const [disableStartButton, setDisableStartButton] = useState(false)
	const [timerHasRun, setTimerHasRun] = useState(false)

	const targetScore = useMemo(
		() =>
			options.find((o) => o.title.toLowerCase() === answer.toLowerCase())
				?.score ?? Score.Wrong,
		[options, answer]
	)

	let intervalRef = useRef<NodeJS.Timer | number | null>(null)
	let timeoutRef = useRef<NodeJS.Timer | number | null>(null)

	const clear = () => {
		window.clearInterval(intervalRef.current as number)
		window.clearTimeout(timeoutRef.current as number)
	}

	const decreaseScore = useCallback(() => {
		setCurrentScore((prev) => prev - 1)
	}, [])

	const startCountdown = () => {
		setTimerIsRunning(true)
		playCountdownAudio()
		intervalRef.current = setInterval(() => {
			decreaseScore()
		}, COUNT_DOWN_DURATION / maxScore)
	}

	const handleStart = () => {
		setDisableStartButton(true)
		// Start countdown after 3 seconds
		timeoutRef.current = setTimeout(() => {
			if (targetScore === Score.Wrong) {
				stop(true)
				playWrongAudio()
				setCurrentScore(Score.Wrong)
				onFinish(-1)
				return
			}
			startCountdown()
		}, 3000)
	}

	const handleReset = useCallback(() => {
		setTimerHasRun(false)
		setCurrentScore(maxScore)
		setDisableStartButton(false)
	}, [maxScore])

	const stop = useCallback(
		(skipStopAudio = false) => {
			stopCountdownAudio()
			if (!skipStopAudio) {
				playStopAudio()
			}
			clear()
			setTimerIsRunning(false)
			setTimerHasRun(true)
			setDisableStartButton(false)
		},
		[playStopAudio, stopCountdownAudio]
	)

	useEffect(() => {
		if (currentScore === targetScore && timerIsRunning) {
			stop()
			if (targetScore === Score.Pointless) {
				playPointlessAudio()
			}
			onFinish(currentScore)
		}
	}, [
		currentScore,
		targetScore,
		timerIsRunning,
		playPointlessAudio,
		stop,
		onFinish,
	])

	useEffect(() => {
		return () => {
			clear()
		}
	}, [])

	return {
		currentScore,
		timerIsRunning,
		disableStartButton,
		timerHasRun,
		handleStart,
		handleReset,
	}
}
