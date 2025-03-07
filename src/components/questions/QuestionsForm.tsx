"use client"
import { Box, Container } from "@mui/material"
import { Mode } from "@/utils/types"
import { useApp } from "../../context/AppContext"
import { useQuestions } from "@/context/QuestionFormContext"
import { FileImporter } from "./FileImporter"
import { Questions } from "./Questions"
import { useEffect } from "react"
import { ButtonPanel } from "./ButtonPanel"

export function QuestionsForm() {
	const {
		questions,
		formRef,
		formIsValid,
		checkFormValidity,
		handleAddRandomQuestion,
	} = useQuestions()
	const { setMode } = useApp()

	const handleComplete = () => {
		if (formIsValid) {
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
					<ButtonPanel onComplete={handleComplete} />
				</form>
			</Box>
		</Container>
	)
}
