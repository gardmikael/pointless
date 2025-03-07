import { CountdownProps, Score } from "@/utils/types"
import { Box, Card, Paper, Stack, Typography } from "@mui/material"
import countdownStyles from "./style/countdown.module.css"
import clsx from "clsx"

export const Countdown = ({
	currentScore,
	maxScore,
	isRunning,
}: CountdownProps) => {
	const Point = ({ isLast }: { isLast: boolean }) => (
		<Box
			className={clsx(
				countdownStyles.point,
				isLast && countdownStyles.last,
				isRunning && countdownStyles.active
			)}
		/>
	)
	const isPointless = currentScore === Score.Pointless
	const isWrong = currentScore === Score.Wrong

	return (
		<Box display='flex' flexDirection='column' alignItems='center' p={2}>
			<Paper variant='countdown1' sx={{ px: 5, py: 2 }}>
				<Paper variant='countdown2' sx={{ mx: 2 }}>
					<Card
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							padding: ".5rem",
							borderRadius: "50%",
							width: 200,
							backgroundColor: "#323541",
							margin: ".5rem",
							overflow: "visible",
						}}
					>
						<Typography
							variant='h2'
							sx={{
								fontWeight: 700,
								color: `${isWrong ? "red" : "yellow"}`,
							}}
							className={clsx(isPointless && countdownStyles.glow)}
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
