import { Box, IconButton, Stack, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useQuestions } from "@/context/QuestionFormContext"

export const Option = ({ title, score, index, qIndex }: any) => {
	const { questions, hasError, handleOptionChange, handleRemoveOption } =
		useQuestions()

	const disabled = questions[qIndex].options.length === 1
	const oid = `o${qIndex}_${index}`
	const otid = `ot${qIndex}_${index}`
	const maxScore = questions[qIndex].maxScore

	return (
		<Stack spacing={2}>
			<Box display='flex' alignItems='flex-start' gap={2} sx={{ ml: 2 }}>
				<TextField
					id={otid}
					size='small'
					label={`Svaralternativ ${index + 1}`}
					value={title}
					sx={{ flex: 1 }}
					autoFocus={index !== 0}
					onFocus={(e) => e.target.select()}
					inputProps={{
						required: true,
					}}
					error={hasError(otid)}
					helperText={hasError(otid) && "Kan ikke være tom."}
					onChange={({ target: { value } }) => {
						handleOptionChange(qIndex, index, {
							title: value,
							score,
						})
					}}
				/>
				<TextField
					id={oid}
					size='small'
					label='Score'
					value={score !== null ? score : ""}
					inputProps={{
						type: "number",
						required: true,
						max: maxScore,
						min: 0,
					}}
					error={hasError(oid)}
					sx={{ width: 80 }}
					onChange={({ target: { value } }) => {
						handleOptionChange(qIndex, index, {
							title,
							score: parseInt(value),
						})
					}}
				/>

				<IconButton
					onClick={() => handleRemoveOption(qIndex, index)}
					disabled={disabled}
					tabIndex={-1}
					color='error'
				>
					<DeleteIcon />
				</IconButton>
			</Box>
		</Stack>
	)
}
