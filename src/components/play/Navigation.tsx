import {
	activeTeamIndex,
	isTheLastQuestion,
	qIndex,
	questions,
} from "@/utils/misc"
import { Box, Button } from "@mui/material"

export const Navigation = () => {
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

	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
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
				disabled={isTheLastQuestion.value}
			>
				Neste spørsmål
			</Button>
		</Box>
	)
}
