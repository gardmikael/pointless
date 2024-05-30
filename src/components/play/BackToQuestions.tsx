import { Modes, mode } from "@/utils/misc"
import { Button } from "@mui/material"

export const BackToQuestions = () => {
	return (
		<Button
			variant='outlined'
			size='small'
			sx={{ mb: 2 }}
			onClick={() => (mode.value = Modes.Create)}
		>
			Tilbake til spørsmål
		</Button>
	)
}
