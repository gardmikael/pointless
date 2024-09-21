import { Box, Container } from "@mui/material"
import { Mode, Question } from "@/utils/types"
import { useApp } from "../../context/AppContext"
import { useQuestions } from "@/context/QuestionFormContext"
import { FileImporter } from "./FileImporter"
import { Questions } from "./Questions"
import { useEffect } from "react"
import { ButtonPanel } from "./ButtonPanel"

type QuestionsProps = {
	callback?: (questions: Question[]) => void
}

export const QuestionsForm = ({ callback = () => {} }: QuestionsProps = {}) => {
	const {
		questions,
		formRef,
		formIsValid,
		checkFormValidity,
		handleAddRandomQuestion,
	} = useQuestions()
	const { setMode } = useApp()

	const onComplete = () => {
		if (formIsValid) {
			callback(questions)
			setMode(Mode.Teams)
		}
	}

	useEffect(() => {
		handleAddRandomQuestion()
	}, [])

	return (
		<Container>
			<Box py={5}>
				<FileImporter />
				<form
					id='questions'
					ref={formRef}
					noValidate
					onChange={checkFormValidity}
				>
					<Questions />
					<ButtonPanel onComplete={onComplete} />
				</form>
			</Box>
		</Container>
	)
}
