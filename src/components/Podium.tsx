import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { Paper, Typography } from "@mui/material"
import { CenteredFlexBox } from "./CenteredFlexBox"
import JSConfetti from "js-confetti"
import { placeInfo, teams } from "@/utils/misc"

const Podium = () => {
	const sortedTeams = teams.value
		.sort((a, b) => {
			const aScore = a.scores.flat().reduce((a, b) => a + b, 0)
			const bScore = b.scores.flat().reduce((a, b) => a + b, 0)
			return aScore - bScore
		})
		.map((team, index) => ({
			...team,
			place: index + 1,
		}))
		.slice(0, 3)

	const jsConfetti = new JSConfetti()

	const timeout = sortedTeams.length * 1400

	useEffect(() => {
		setTimeout(() => {
			jsConfetti.addConfetti()
		}, timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='podium'>
			{sortedTeams.reverse().map((team, index) => (
				<motion.div
					key={team.name}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2 * index }}
				>
					<Paper className={placeInfo[team.place].className}>
						<CenteredFlexBox>
							<h3>
								{placeInfo[team.place].text} {team.name}
							</h3>
							<Typography component='h3' sx={{ fontSize: "2rem" }}>
								{team.scores.flat().reduce((a, b) => a + b, 0)}
							</Typography>
						</CenteredFlexBox>
					</Paper>
				</motion.div>
			))}
		</div>
	)
}

export default Podium
