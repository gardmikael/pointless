import { CountdownProps, Score } from "@/utils/types"
import { Box, Card, Paper, Stack, Typography } from "@mui/material"

export const Countdown = ({
	currentScore,
	maxScore,
	isRunning,
}: CountdownProps) => {
	const Point = ({ isLast }: { isLast: boolean }) => (
		<Box
			className={`point ${isLast ? "last" : ""} ${isRunning ? "active" : ""}`}
		/>
	)
	const isPointless = currentScore === Score.Pointless
	const isWrong = currentScore === Score.Wrong

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Paper className='outer-container'>
				<Paper className='inner-container' sx={{ mx: 2 }}>
					<Card className='current-score'>
						<Typography
							variant='h2'
							sx={{
								fontWeight: 700,
								color: `${isWrong ? "red" : "yellow"}`,
							}}
							className={isPointless ? "glow" : ""}
						>
							{isWrong ? "X" : isPointless ? "POINTLESS" : currentScore}
						</Typography>
					</Card>
					<Stack
						direction='column-reverse'
						gap={0.25}
						height={500}
						sx={{ mx: 1, alignItems: "center" }}
					>
						{Array.from(
							{
								length: isWrong ? maxScore : currentScore,
							},
							(_, i) => (
								<Point key={i} isLast={i === currentScore - 1} />
							)
						)}
					</Stack>
				</Paper>
			</Paper>
		</Box>
	)
}
