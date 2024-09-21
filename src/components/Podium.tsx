import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { Paper, Typography } from "@mui/material"
import { CenteredFlexBox } from "./CenteredFlexBox"
import JSConfetti from "js-confetti"
import { useTeams } from "../context/TeamsContext"
import { PlaceInfo } from "@/utils/types"

const placeInfo: PlaceInfo = [
	{ className: "first-place", text: "Førsteplass:" },
	{ className: "second-place", text: "Andreplass:" },
	{ className: "third-place", text: "Tredjeplass:" },
]

const Podium = () => {
	const { teams } = useTeams()
	const sortedTeams = teams
		.sort((a, b) => {
			const aScore = a.scores.flat().reduce((a, b) => a + b, 0)
			const bScore = b.scores.flat().reduce((a, b) => a + b, 0)
			return aScore - bScore
		})
		.map((team, index) => ({
			...team,
			place: index,
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
			{sortedTeams.reverse().map(({ place, name, scores }, index) => (
				<motion.div
					key={name}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2 * index }}
				>
					<Paper className={placeInfo[place].className}>
						<CenteredFlexBox>
							<Typography component='h2'>
								{placeInfo[place].text} {name}
							</Typography>
							<Typography component='h3' sx={{ fontSize: "2rem" }}>
								{scores.flat().reduce((a, b) => a + b, 0)}
							</Typography>
						</CenteredFlexBox>
					</Paper>
				</motion.div>
			))}
		</div>
	)
}

export default Podium
