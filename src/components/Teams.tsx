import {
	Box,
	Button,
	Container,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	TextField,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useTeams } from "../context/TeamsContext"
import { Mode } from "@/utils/types"
import { useApp } from "../context/AppContext"

export const Teams = () => {
	const {
		teams,
		handleTeamChange,
		addTeam,
		deleteTeam,
		addNewQuestionArrayForAllTeams,
	} = useTeams()
	const { setMode } = useApp()

	const canDeleteTeam = teams.length > 1

	const handleStart = () => {
		addNewQuestionArrayForAllTeams()
		setMode(Mode.Play)
	}
	return (
		<Container>
			<Box py={5}>
				<form id='teams'>
					<Paper elevation={3} sx={{ p: 3 }}>
						<List subheader={<ListSubheader>Lag</ListSubheader>}>
							{teams.map((team, index) => (
								<ListItem key={`team-${index}`}>
									<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
										<TextField
											size='small'
											sx={{ flex: 1 }}
											value={team.name ?? ""}
											name='name'
											onChange={(e) => handleTeamChange(index, e)}
											autoFocus
										/>

										<IconButton
											disabled={!canDeleteTeam}
											onClick={() => deleteTeam(index)}
											color='error'
										>
											<DeleteIcon />
										</IconButton>
									</Box>
								</ListItem>
							))}
						</List>

						<Button sx={{ m: 2 }} onClick={addTeam}>
							Nytt lag
						</Button>
					</Paper>
				</form>
				<Box sx={{ display: "flex" }}>
					<Button
						color='success'
						sx={{ ml: "auto", my: 2 }}
						onClick={handleStart}
					>
						Spill
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
