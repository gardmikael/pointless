import { Team } from "@/utils/types"
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material"

interface TeamsTableProps {
	teams: Team[]
	activeTeamIndex: number
	qIndex: number
}

export const TeamsTable = ({
	teams,
	activeTeamIndex,
	qIndex,
}: TeamsTableProps) => {
	return (
		<TableContainer sx={{ maxWidth: "100%", overflow: "auto" }}>
			<Table size='small' sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						<TableCell>Lag</TableCell>
						{teams.some((team) => team.scores.length > 0) &&
							Array.from({ length: qIndex + 1 }, (_, qIdx) => (
								<TableCell key={`header-${qIdx}`} align='center'>
									Q{qIdx + 1}
								</TableCell>
							))}
						<TableCell align='center'>Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{teams.map((team, index) => {
						const hasScores = team.scores.some((score) => score !== undefined)
						const totalScore = hasScores
							? team.scores.reduce((sum, score) => sum + (score || 0), 0)
							: "-"

						return (
							<TableRow
								key={`team-${team.name}`}
								sx={{
									backgroundColor:
										activeTeamIndex === index
											? "rgba(0, 0, 0, 0.04)"
											: "inherit",
								}}
							>
								<TableCell>
									<Typography
										sx={{
											fontWeight: activeTeamIndex === index ? "bold" : "normal",
										}}
									>
										{team.name}
									</Typography>
								</TableCell>
								{teams.some((team) => team.scores.length > 0) &&
									Array.from({ length: qIndex + 1 }, (_, idx) => (
										<TableCell key={`score-${idx}`} align='center'>
											{idx < team.scores.length ? team.scores[idx] ?? "-" : "-"}
										</TableCell>
									))}
								<TableCell align='center' sx={{ fontWeight: "bold" }}>
									{totalScore}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
