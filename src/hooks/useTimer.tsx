import { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound'
import { Option } from "@/utils/types"
import { COUNT_DOWN_DURATION, qIndex, questions } from '@/utils/misc'
import { answer } from '@/components/play/Play'

export const useTimer = () => {
    const { maxScore } = questions.value[qIndex.value]

    const [currentScore, setCurrentScore] = useState<number>(maxScore)
    const [timerIsRunning, setTimerIsRunning] = useState(false)
    const [disableStartButton, setDisableStartButton] = useState(false)
    const [targetScore, setTargetScore] = useState(0)
    const [showReset, setShowReset] = useState(false)

    const [playCountdownAudio, { stop: stopCountdownAudio }] = useSound('/audio/countdown.mp3')
    const [playWrongAudio] = useSound('/audio/wrong.mp3')
    const [playStopAudio] = useSound('/audio/stop.mp3', { volume: 0.5 })
    const [playPointlessAudio] = useSound('/audio/pointless.mp3')

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
            (option) => option.title.toLowerCase() === answer.value.toLowerCase()
        )
        const answerIsPointless = answer.value.at(-1) === ' '

        setTimeout(() => {
            if (answerIsPointless || !!correctAnswer) {
                const targetScore = answerIsPointless ? 0 : (correctAnswer as Option).score!
                setTargetScore(targetScore)
                if (targetScore === maxScore) {
                    playStopAudio()
                    setShowReset(true)
                    //onTargetScoreReached(targetScore)
                    return
                }
                setTimerIsRunning(true)
                startCountdown(targetScore)
            } else {
                setCurrentScore(-1)
                playWrongAudio()
                setShowReset(true)
                //onTargetScoreReached(maxScore)
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
        }, COUNT_DOWN_DURATION / maxScore)
    };

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
            //onTargetScoreReached(targetScore)
        }
    }, [currentScore])

    useEffect(() => {
        return () => {
            clear()
        }
    }, [])

    return {
        currentScore,
        timerIsRunning,
        disableStartButton,
        showReset,
        handleStart,
        setCurrentScore,
        setDisableStartButton,
        setShowReset,
        handleReset: () => {
            setShowReset(false)
            setCurrentScore(maxScore)
            setDisableStartButton(false)
        }
    }
}
