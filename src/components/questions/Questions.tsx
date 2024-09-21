import { Box, Button, IconButton, Paper, Stack, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRef } from "react"
import { Option } from "./Option"
import { useQuestions } from "@/context/QuestionFormContext"

export const Questions = () => {
	const {
		questions,
		handleQuestionChange,
		handleAddOption,
		handleRemoveQuestion,
		handleMaxScoreChange,
		hasError,
		formIsValid,
	} = useQuestions()

	const inputRef = useRef<HTMLInputElement | null>(null)

	return (
		<>
			{questions.map(({ question, options, maxScore }, qIndex) => {
				const qDisabled = questions.length === 1
				const minScore = Math.max(
					...questions[qIndex].options.map(({ score }) => score || 3)
				)
				const qId = `q${qIndex}`
				const qmsId = `qms${qIndex}`
				return (
					<Box key={`question_${qIndex}`} sx={{ mb: 2 }}>
						<Paper sx={{ p: 4, position: "relative" }}>
							{!qDisabled && (
								<Box
									sx={{
										position: "absolute",
										top: "-10px",
										right: "-10px",
									}}
								>
									<IconButton
										className='delete-btn'
										onClick={() => handleRemoveQuestion(qIndex)}
										color='error'
									>
										<DeleteIcon />
									</IconButton>
								</Box>
							)}

							<Stack spacing={3}>
								<Box display='flex' gap={2}>
									<TextField
										fullWidth
										id={qId}
										inputRef={inputRef}
										label={`Spørsmål ${qIndex + 1}`}
										value={question}
										autoFocus={true}
										onFocus={(e) => e.target.select()}
										inputProps={{
											required: true,
										}}
										error={hasError(qId)}
										helperText={hasError(qId) && "Kan ikke være tom"}
										onChange={({ target: { value } }) =>
											handleQuestionChange(qIndex, value)
										}
									/>
									<TextField
										id={qmsId}
										label='Max score'
										value={maxScore !== null ? maxScore : ""}
										sx={{ minWidth: 100 }}
										inputProps={{
											type: "number",
											max: 100,
											min: minScore,
											required: true,
											step: 1,
										}}
										error={hasError(qmsId)}
										onChange={({ target: { value } }) => {
											handleMaxScoreChange(qIndex, parseInt(value))
										}}
									/>
								</Box>
								{options.map(({ title, score }, oIndex) => (
									<Option
										key={`q_${qIndex}_option_${oIndex}`}
										title={title}
										score={score}
										index={oIndex}
										qIndex={qIndex}
									/>
								))}
								<Button
									variant='outlined'
									onClick={() => handleAddOption(qIndex)}
									disabled={!formIsValid}
								>
									Legg til nytt svaralternativ
								</Button>
							</Stack>
						</Paper>
					</Box>
				)
			})}
		</>
	)
}
