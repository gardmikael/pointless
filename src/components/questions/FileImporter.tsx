import { useQuestions } from "@/context/QuestionFormContext"
import { useFileImporter } from "@/hooks/useFileImporter"
import { Question } from "@/utils/types"
import { Button } from "@mui/material"

export const FileImporter = () => {
	const { setQuestions } = useQuestions()
	const callback = (questions: Question[]) => {
		setQuestions(questions)
	}
	const { handleFileUpload } = useFileImporter({ callback })

	return (
		<label htmlFor='csvFile'>
			<Button variant='outlined' component='span' sx={{ mb: 2 }}>
				Importer spill
			</Button>
			<input
				type='file'
				accept='.csv'
				id='csvFile'
				style={{ display: "none" }}
				onChange={handleFileUpload}
			/>
		</label>
	)
}
