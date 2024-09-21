import {
	Box,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material"
import LoopIcon from "@mui/icons-material/Loop"
import { useTeams } from "../../context/TeamsContext"
import { usePlay } from "@/context/PlayContext"

export const Teams = () => {
	const { teams, reverseTeamOrder } = useTeams()
	const { activeTeamIndex, qIndex } = usePlay()
	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<List subheader={<ListSubheader>Lag</ListSubheader>}>
				{teams.map((team, index) => (
					<ListItem key={`team-${team.name}`}>
						<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
							<Typography
								component='h3'
								sx={{
									flex: 1,
									fontWeight: activeTeamIndex === index ? "bold" : "normal",
								}}
							>
								{team.name}
							</Typography>

							<Typography mr={3}>
								{team.scores[qIndex] === undefined
									? "-"
									: team.scores[qIndex].join(", ")}
							</Typography>

							{qIndex > 0 && (
								<Typography sx={{ fontWeight: "bold" }}>
									{team.scores.flat().reduce((acc, score) => {
										if (score >= 0) {
											return acc + score
										}
										return acc
									}, 0)}
								</Typography>
							)}
						</Box>
					</ListItem>
				))}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Tooltip title='Reverser rekkefølgen på lagene'>
						<IconButton onClick={reverseTeamOrder}>
							<LoopIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</List>
		</Paper>
	)
}
