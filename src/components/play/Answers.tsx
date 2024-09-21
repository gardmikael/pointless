import { List, ListItem, Paper, Typography } from "@mui/material"
import { usePlay } from "../../context/PlayContext"
import { AnswersProps } from "@/utils/types"

export const Answers = ({ options }: AnswersProps) => {
	const { qIndex } = usePlay()
	return (
		<Paper elevation={3} sx={{ p: 2, my: 2 }}>
			<List>
				{options
					.sort((a, b) => b.score - a.score)
					.map(({ title, score }, index) => (
						<ListItem key={`q-${qIndex}-option-${index}`}>
							<Typography variant='caption'>{`${title} (${score})`}</Typography>
						</ListItem>
					))}
			</List>
		</Paper>
	)
}
