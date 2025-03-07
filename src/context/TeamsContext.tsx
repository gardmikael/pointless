"use client"

import { Team, TeamsContextType } from "@/utils/types"
import {
	ChangeEvent,
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react"

const TeamsContext = createContext<TeamsContextType | undefined>(undefined)!

export function TeamsProvider({ children }: { children: ReactNode }) {
	const [teams, setTeams] = useState<Team[]>([
		{
			name: "Lag 1",
			scores: [],
		},
	])

	const handleTeamChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTeams((prevTeams) => {
			const { name, value } = e.target
			const updatedTeams = [...prevTeams]
			updatedTeams[index] = {
				...updatedTeams[index],
				[name]: value,
			}
			return updatedTeams
		})
	}

	const handleTeamScoreChange = useCallback(
		(teamIndex: number, scoreIndex: number, value: number) => {
			setTeams((prevTeams) => {
				const updatedTeams = [...prevTeams]

				if (teamIndex >= 0 && teamIndex < updatedTeams.length) {
					// Oppdater scores array for det aktuelle laget
					updatedTeams[teamIndex] = {
						...updatedTeams[teamIndex],
						scores: [
							...updatedTeams[teamIndex].scores.slice(0, scoreIndex),
							value,
							...updatedTeams[teamIndex].scores.slice(scoreIndex + 1),
						],
					}
					return updatedTeams
				} else {
					console.error(`Ugyldig teamIndex: ${teamIndex}`)
					return prevTeams
				}
			})
		},
		[setTeams]
	)

	const addTeam = () => {
		setTeams((prevTeams) => [
			...prevTeams,
			{
				name: `Lag ${prevTeams.length + 1}`,
				scores: [],
			},
		])
	}

	const deleteTeam = (index: number) => {
		setTeams((prevTeams) => {
			const updatedTeams = [...prevTeams]
			updatedTeams.splice(index, 1)
			return updatedTeams
		})
	}

	const reverseTeamOrder = () => {
		setTeams((prevTeams) => [...prevTeams].reverse())
	}

	return (
		<TeamsContext.Provider
			value={{
				teams,
				handleTeamChange,
				addTeam,
				deleteTeam,
				reverseTeamOrder,
				handleTeamScoreChange,
			}}
		>
			{children}
		</TeamsContext.Provider>
	)
}

export function useTeams(): TeamsContextType {
	const context = useContext(TeamsContext)

	if (context === undefined) {
		throw new Error("useTeams must be used inside an TeamsProvider")
	}
	return context as TeamsContextType
}
