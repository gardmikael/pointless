import {
	Box,
	IconButton,
	List,
	ListItem,
	ListSubheader,
	Paper,
	TextField,
	Typography,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { ChangeEvent, useState } from "react"
import { activeTeamIndex, qIndex, teams } from "./Play"

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
				scores: Array(qIndex.value),
			},
		]
	}

	const handleDeleteTeam = (index: number) => {
		teams.value = teams.value.filter((_, i) => i !== index)
	}

	const allTeamsHasAnsweredTheCurrentQuestion = teams.value.every(
		(team) => team.scores[qIndex.value] !== undefined
	)

	const teamColor = (index: number) => {
		if (!allTeamsHasAnsweredTheCurrentQuestion) {
			return "black"
		}
		const scores = teams.value.map(({ scores }) => scores[qIndex.value])

		const minScore = Math.min(...scores)
		const maxScore = Math.max(...scores)

		const minIndexes = [] as number[]
		const maxIndexes = [] as number[]

		teams.value.forEach((team, index) => {
			if (team.scores[qIndex.value] === minScore) {
				minIndexes.push(index)
			}
			if (team.scores[qIndex.value] === maxScore) {
				maxIndexes.push(index)
			}
		})
		if (maxIndexes.includes(index)) {
			return "error.main"
		}
		if (minIndexes.includes(index)) {
			return "success.main"
		}
	}

	return (
		<Paper elevation={3} sx={{ p: 3 }}>
			<List subheader={<ListSubheader>Lag</ListSubheader>}>
				{teams.value.map((team, index) => (
					<ListItem key={`team-${index}`}>
						<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
							{index === editIndex ? (
								<TextField
									size='small'
									sx={{ flex: 1 }}
									value={team.name}
									onChange={handleTeamNameChange}
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

							<Typography color={teamColor(index)} mr={3}>
								{team.scores[qIndex.value] === undefined
									? "-"
									: team.scores[qIndex.value]}
							</Typography>

							{qIndex.value > 0 && (
								<Typography sx={{ fontWeight: "bold" }}>
									{team.scores.reduce((acc, score) => {
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
				<IconButton
					sx={{ display: "flex", ml: "auto" }}
					color='success'
					onClick={handleAddTeam}
				>
					<AddCircleIcon />
				</IconButton>
			</List>
		</Paper>
	)
}
