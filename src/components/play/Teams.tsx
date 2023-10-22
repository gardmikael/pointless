import { Box, Button, IconButton, TextField, Typography } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { ChangeEvent, useState } from "react"
import { useQuestionStore } from "@/QuestionStore"

export const Teams = () => {
	const [editIndex, setEditIndex] = useState(-1)

	const { teams, updateTeam, addTeam, removeTeam, activeTeamIndex, qIndex } =
		useQuestionStore()

	const handleTeamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const team = teams[editIndex]
		team.name = e.target.value
		updateTeam(editIndex, team)
	}

	const handleSave = () => {
		setEditIndex(-1)
	}

	return (
		<Box sx={{ border: "3px solid", borderRadius: "10px", p: 3 }}>
			{teams.map((team, index) => (
				<Box
					key={`team-${index}`}
					sx={{ display: "flex", alignItems: "center" }}
				>
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
								fontWeight: activeTeamIndex === index ? "bold" : "normal",
							}}
						>
							{team.name}
						</Typography>
					)}

					<Typography mr={3}>
						{team.scores[qIndex] === -1 ? "-" : team.scores[qIndex]}
					</Typography>
					{index === editIndex ? (
						<IconButton onClick={handleSave}>
							<CheckCircleIcon color='success' />
						</IconButton>
					) : (
						<IconButton onClick={() => setEditIndex(index)}>
							<EditIcon />
						</IconButton>
					)}

					<IconButton onClick={() => removeTeam(index)}>
						<DeleteIcon color='error' />
					</IconButton>
				</Box>
			))}
			<IconButton
				sx={{ display: "flex", ml: "auto" }}
				color='success'
				onClick={() =>
					addTeam({ name: `Lag ${teams.length + 1}`, scores: [-1] })
				}
			>
				<AddCircleIcon />
			</IconButton>
		</Box>
	)
}
