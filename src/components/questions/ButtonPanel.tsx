import { useQuestions } from "@/context/QuestionFormContext"
import { useFileImporter } from "@/hooks/useFileImporter"
import { Box, Button } from "@mui/material"

export const ButtonPanel = ({ onComplete }: { onComplete: any }) => {
	const { questions, formIsValid, handleAddRandomQuestion } = useQuestions()
	const { handleSaveAsCSV } = useFileImporter()

	return (
		<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
			<Button
				variant='contained'
				onClick={handleAddRandomQuestion}
				disabled={!formIsValid}
			>
				Legg til nytt spørsmål
			</Button>

			<Button
				variant='outlined'
				onClick={() => handleSaveAsCSV(questions)}
				sx={{ ml: 2 }}
			>
				Lagre spill
			</Button>
			<Button
				variant='contained'
				color='success'
				sx={{ ml: "auto" }}
				disabled={!formIsValid}
				onClick={onComplete}
			>
				Spill
			</Button>
		</Box>
	)
}
