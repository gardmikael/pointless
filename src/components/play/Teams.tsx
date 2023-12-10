import {
	Box,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { ChangeEvent, useState } from "react"
import {
	activeTeamIndex,
	handleReverseTeams,
	qIndex,
	teams,
} from "@/utils/misc"
import LoopIcon from "@mui/icons-material/Loop"

export const Teams = () => {
	const [editIndex, setEditIndex] = useState(-1)

	const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const updatedTeams = teams.value.map((team, index) => {
			if (index === editIndex) {
				return { ...team, name: e.target.value }
			}
			return team
		})
		teams.value = updatedTeams
	}

	const handleSave = () => {
		setEditIndex(-1)
	}

	const handleAddTeam = () => {
		teams.value = [
			...teams.value,
			{
				name: `Lag ${teams.value.length + 1}`,
				scores: [],
			},
		]
	}

	const handleDeleteTeam = (index: number) => {
		teams.value = teams.value.filter((_, i) => i !== index)
	}

	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<List subheader={<ListSubheader>Lag</ListSubheader>}>
				{teams.value.map((team, index) => (
					<ListItem key={`team-${team.name}`}>
						<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
							{index === editIndex ? (
								<TextField
									size='small'
									sx={{ flex: 1 }}
									value={team.name}
									onChange={handleTeamNameChange}
									autoFocus
								/>
							) : (
								<Typography
									component='h3'
									sx={{
										flex: 1,
										fontWeight:
											activeTeamIndex.value === index ? "bold" : "normal",
									}}
								>
									{team.name}
								</Typography>
							)}

							<Typography mr={3}>
								{team.scores[qIndex.value] === undefined
									? "-"
									: team.scores[qIndex.value].join(", ")}
							</Typography>

							{qIndex.value > 0 && (
								<Typography sx={{ fontWeight: "bold" }}>
									{team.scores.flat().reduce((acc, score) => {
										if (score >= 0) {
											return acc + score
										}
										return acc
									}, 0)}
								</Typography>
							)}
							{index === editIndex ? (
								<IconButton onClick={handleSave}>
									<CheckCircleIcon color='success' />
								</IconButton>
							) : (
								<IconButton onClick={() => setEditIndex(index)}>
									<EditIcon />
								</IconButton>
							)}

							<IconButton onClick={() => handleDeleteTeam(index)}>
								<DeleteIcon color='error' />
							</IconButton>
						</Box>
					</ListItem>
				))}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton
						sx={{ display: "flex", ml: "auto" }}
						color='success'
						onClick={handleAddTeam}
					>
						<AddCircleIcon />
					</IconButton>
					<Tooltip title='Reverser rekkefølgen på lagene'>
						<IconButton onClick={handleReverseTeams}>
							<LoopIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</List>
		</Paper>
	)
}
