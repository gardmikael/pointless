import { Grid2 as Grid } from "@mui/material"
import { Countdown } from "./Countdown"
import { BackToQuestions } from "./BackToQuestions"
import { PlayProps } from "@/utils/types"
import { usePlay } from "../../context/PlayContext"
import { useEffect } from "react"
import { QuestionAnswerSection } from "./QuestionAnswerSection"
import { RightColumn } from "./RightColumn"

const Play = ({ questions }: PlayProps) => {
	const {
		qIndex,
		handleNextTeam,
		currentScore,
		timerIsRunning,
		allTeamsHasAnsweredTheCurrentQuestion,
		isTheLastTeamOnTheList,
		isTheLastQuestionForTheLastTeam,
		allTeamsHasAnsweredAllQuestions,
	} = usePlay()

	const { maxScore, options } = questions[qIndex]

	if (questions.length === 0) {
		return <div>Ingen spørsmål</div>
	}

	return (
		<Grid container>
			<Grid size={3}>
				<BackToQuestions />
			</Grid>
			<Grid size={6}>
				<Countdown
					currentScore={currentScore}
					maxScore={maxScore}
					isRunning={timerIsRunning}
				/>
				<QuestionAnswerSection />
			</Grid>
			<Grid size={3}>
				<RightColumn
					options={options}
					allTeamsHasAnsweredTheCurrentQuestion={
						allTeamsHasAnsweredTheCurrentQuestion
					}
					isTheLastTeamOnTheList={isTheLastTeamOnTheList}
					isTheLastQuestionForTheLastTeam={isTheLastQuestionForTheLastTeam}
					allTeamsHasAnsweredAllQuestions={allTeamsHasAnsweredAllQuestions}
					handleNextTeam={handleNextTeam}
				/>
			</Grid>
		</Grid>
	)
}

export default Play
