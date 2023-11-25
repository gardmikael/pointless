import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { teams } from "./play/Play"
import { Typography } from "@mui/material"
import { CenteredFlexBox } from "./CenteredFlexBox"
import JSConfetti from "js-confetti"

const Podium = () => {
	//get an array of the 3 teams with the overall lowest score
	const sortedTeams = teams.value.sort((a, b) => {
		const aScore = a.scores.reduce((a, b) => a + b, 0)
		const bScore = b.scores.reduce((a, b) => a + b, 0)
		//return aScore - bScore
		return bScore - aScore
	})

	const jsConfetti = new JSConfetti()

	interface PlaceInfo {
		[key: number]: {
			className: string
			text: string
		}
	}

	const placeInfo: PlaceInfo = {
		0: { className: "third-place", text: "Tredje plass:" },
		1: { className: "second-place", text: "Andre plass:" },
		2: { className: "first-place", text: "Første plass:" },
	}

	const timeout = sortedTeams.length * 1400

	useEffect(() => {
		setTimeout(() => {
			jsConfetti.addConfetti()
		}, timeout)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='podium'>
			{sortedTeams.map((team, index) => (
				<motion.div
					key={team.name}
					className={placeInfo[index].className}
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2 * index }}
				>
					<CenteredFlexBox>
						<h3>
							{placeInfo[index].text} {team.name}
						</h3>
						<Typography component='h3' sx={{ fontSize: "2rem" }}>
							{team.scores.reduce((a, b) => a + b, 0)}
						</Typography>
					</CenteredFlexBox>
				</motion.div>
			))}
		</div>
	)
}

export default Podium
