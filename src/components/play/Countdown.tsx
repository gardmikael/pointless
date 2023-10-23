import { Box, Card, Paper, Stack, Typography } from "@mui/material"

type CountdownProps = {
	currentScore: number
	maxScore: number
	isRunning: boolean
}

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

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Paper className='outer-container'>
				<Paper className='inner-container' sx={{ mx: 2 }}>
					<Card className='current-score'>
						<Typography
							variant='h2'
							sx={{
								fontWeight: 700,
								color: `${currentScore === -1 ? "red" : "yellow"}`,
							}}
							className={currentScore === 0 ? "glow" : ""}
						>
							{currentScore === -1
								? "X"
								: currentScore === 0
								? "POINTLESS"
								: currentScore}
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
								length: currentScore === -1 ? maxScore! : currentScore,
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
