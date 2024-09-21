import { usePlay } from "@/context/PlayContext"
import { Box, Button, TextField, Typography } from "@mui/material"

export const QuestionAnswerSection = () => {
	const {
		questions,
		qIndex,
		answer,
		handleAnswerChange,
		handleNextTeam,
		timerHasRun,
		handleStart,
		disableStartButton,
		allTeamsHasAnsweredTheCurrentQuestion,
		isTheLastTeamOnTheList,
	} = usePlay()

	const { question } = questions[qIndex]

	return (
		<>
			<Box sx={{ textAlign: "center", my: 2 }}>
				<Typography>Spørsmål {qIndex + 1}</Typography>
				<Typography variant='h5'>{question}</Typography>
			</Box>
			<Box display='flex' flexDirection='column' alignItems='center' gap={2}>
				<TextField
					onChange={handleAnswerChange}
					value={answer}
					autoComplete='off'
					autoFocus={true}
					disabled={disableStartButton || timerHasRun}
					sx={{
						caretColor: "transparent",
					}}
				/>
				<Box>
					{!allTeamsHasAnsweredTheCurrentQuestion &&
						(timerHasRun ? (
							<Button
								variant='contained'
								color='success'
								onClick={handleNextTeam}
								disabled={isTheLastTeamOnTheList}
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
						))}
				</Box>
			</Box>
		</>
	)
}
