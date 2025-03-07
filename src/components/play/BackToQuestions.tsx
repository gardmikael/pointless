import { Mode } from "@/utils/types"
import { Box, Button } from "@mui/material"
import { useApp } from "../../context/AppContext"

export const BackToQuestions = () => {
	const { setMode } = useApp()
	return (
		<Box p={2}>
			<Button
				variant='outlined'
				size='small'
				sx={{ mb: 2 }}
				onClick={() => setMode(Mode.Questions)}
			>
				Tilbake til spørsmål
			</Button>
		</Box>
	)
}
