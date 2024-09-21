import { Box, Button } from "@mui/material"
import { usePlay } from "../../context/PlayContext"

export const Navigation = ({
	isTheLastQuestion,
}: {
	isTheLastQuestion: boolean
}) => {
	const { handleNextQuestion } = usePlay()

	return (
		<Box
			sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 2 }}
		>
			<Button
				variant='contained'
				color='primary'
				onClick={handleNextQuestion}
				disabled={isTheLastQuestion}
			>
				Neste spørsmål
			</Button>
		</Box>
	)
}
