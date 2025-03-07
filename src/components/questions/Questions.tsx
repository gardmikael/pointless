import { Box, Button, Paper, Stack } from "@mui/material"
import { useRef } from "react"
import { Option } from "./Option"
import { useQuestions } from "@/context/QuestionFormContext"
import { DeleteButton } from "./DeleteButton"
import { QuestionField } from "./QuestionField"
import { MaxScoreField } from "./MaxScoreField"

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
								<DeleteButton onDelete={() => handleRemoveQuestion(qIndex)} />
							)}
							<Stack spacing={3}>
								<Box display='flex' gap={2}>
									<QuestionField
										id={qId}
										question={question}
										index={qIndex}
										inputRef={inputRef}
										hasError={hasError}
										onChange={(value) => handleQuestionChange(qIndex, value)}
									/>
									<MaxScoreField
										id={qmsId}
										maxScore={maxScore}
										minScore={minScore}
										hasError={hasError}
										onChange={(value) => handleMaxScoreChange(qIndex, value)}
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
