import { mode } from "@/pages"
import { Mode } from "@/utils/types"
import { Button } from "@mui/material"

export const BackToQuestions = () => {
	return (
		<Button
			variant='outlined'
			size='small'
			sx={{ mb: 2 }}
			onClick={() => (mode.value = Mode.Questions)}
		>
			Tilbake til spørsmål
		</Button>
	)
}
