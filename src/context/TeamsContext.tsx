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

	const addNewQuestionArrayForAllTeams = useCallback(() => {
		// add a new array to each team
		setTeams((prevTeams) => {
			const updatedTeams = prevTeams.map((team) => ({
				...team,
				scores: [...team.scores, []],
			}))
			return updatedTeams
		})
	}, [])

	const handleTeamScoreChange = useCallback(
		(teamIndex: number, scoreIndex: number, value: number) => {
			setTeams((prevTeams) => {
				// Make a copy of the previous teams array to avoid mutating state directly
				const updatedTeams = [...prevTeams]

				// Ensure that the teamIndex is valid
				if (teamIndex >= 0 && teamIndex < updatedTeams.length) {
					// Ensure that the scoreIndex is valid
					if (
						scoreIndex >= 0 &&
						scoreIndex < updatedTeams[teamIndex].scores.length
					) {
						// Update the score at the specified scoreIndex for the team at teamIndex
						// push the new score to the array
						updatedTeams[teamIndex].scores[scoreIndex].push(value)

						// Return the modified teams array to update the state
						return updatedTeams
					} else {
						console.error(`Invalid scoreIndex: ${scoreIndex}`)
					}
				} else {
					console.error(`Invalid teamIndex: ${teamIndex}`)
				}

				// If indices are invalid, return the previous state unchanged
				return prevTeams
			})
		},
		[setTeams] // Only depend on setTeams
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
				addNewQuestionArrayForAllTeams,
			}}
		>
			{children}
		</TeamsContext.Provider>
	)
}

export function useTeams(): TeamsContextType {
	const context = useContext(TeamsContext)

	if (context === undefined) {
		throw new Error("useApp must be used inside an AppProvider")
	}
	return context as TeamsContextType
}
