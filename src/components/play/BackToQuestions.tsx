import { mode } from "@/pages"
import { Button } from "@mui/material"

export const BackToQuestions = () => {
	return (
		<Button
			variant='outlined'
			size='small'
			sx={{ mb: 2 }}
			onClick={() => (mode.value = "create")}
		>
			Tilbake til spørsmål
		</Button>
	)
}
