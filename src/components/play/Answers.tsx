import { qIndex, questions } from "@/utils/misc"
import { List, ListItem, Paper, Typography } from "@mui/material"

export const Answers = () => {
	return (
		<Paper
			elevation={3}
			sx={{
				p: 2,
				mt: 2,
			}}
		>
			<List>
				{questions.value[qIndex.value].options
					.sort((a, b) => b.score! - a.score!)
					.map(({ title, score }, index) => (
						<ListItem key={`q-${qIndex}-option-${index}`}>
							<Typography variant='caption'>{`${title} (${score})`}</Typography>
						</ListItem>
					))}
			</List>
		</Paper>
	)
}
