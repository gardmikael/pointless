import { Box, IconButton, Paper, Tooltip } from "@mui/material"
import LoopIcon from "@mui/icons-material/Loop"
import { useTeams } from "../../context/TeamsContext"
import { usePlay } from "@/context/PlayContext"
import { TeamsTable } from "./TeamsTable"

export const Teams = () => {
	const { teams, reverseTeamOrder } = useTeams()
	const { activeTeamIndex, qIndex } = usePlay()

	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<TeamsTable
				teams={teams}
				activeTeamIndex={activeTeamIndex}
				qIndex={qIndex}
			/>
			<Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
				<Tooltip title='Reverser rekkefølgen på lagene'>
					<IconButton onClick={reverseTeamOrder}>
						<LoopIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</Paper>
	)
}
