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
import { activeTeamIndex, qIndex } from "./Play"
import { teams } from "@/utils/misc"

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

	/* const allTeamsHasAnsweredTheCurrentQuestion = teams.value.every(
		(team) => team.scores[qIndex.value] !== undefined
	) */

	const allTeamsHasAnsweredTheCurrentQuestion = teams.value.every(
		(team) =>
			team.scores[qIndex.value] !== undefined &&
			team.scores[qIndex.value].length ===
				teams.value[0].scores[qIndex.value].length
	)

	const teamColor = (index: number) => {
		if (
			!allTeamsHasAnsweredTheCurrentQuestion ||
			activeTeamIndex.value !== teams.value.length - 1
		) {
			return "black"
		}
		const scores = teams.value.map(({ scores }) => scores[qIndex.value])

		const totalScores = scores.map((teamScores) =>
			teamScores.reduce((acc, score) => acc + score, 0)
		)

		const maxTotalScore = Math.max(...totalScores)
		const minTotalScore = Math.min(...totalScores)

		const maxIndex = totalScores.indexOf(maxTotalScore)
		const minIndex = totalScores.indexOf(minTotalScore)

		if (index === maxIndex) {
			return "error.main" // Team with the highest combined score
		}
		if (index === minIndex) {
			return "success.main" // Team with the lowest combined score
		}

		return "black" // Default color for other teams
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
