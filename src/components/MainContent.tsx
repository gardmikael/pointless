"use client"

import { useApp } from "@/context/AppContext"
import { Mode } from "@/utils/types"
import { QuestionsForm } from "./questions/QuestionsForm"
import { Teams } from "./Teams"
import Play from "./play/Play"
import Podium from "./podium/Podium"
import { QuestionFormProvider } from "@/context/QuestionFormContext"
import { PlayProvider } from "@/context/PlayContext"
import { useQuestions } from "@/context/QuestionFormContext"

function PlayWithQuestions() {
	const { questions } = useQuestions()
	return (
		<PlayProvider questions={questions}>
			<Play questions={questions} />
		</PlayProvider>
	)
}

export function MainContent() {
	const { mode } = useApp()

	return (
		<QuestionFormProvider>
			{mode === Mode.Questions && <QuestionsForm />}
			{mode === Mode.Teams && <Teams />}
			{mode === Mode.Play && <PlayWithQuestions />}
			{mode === Mode.Podium && <Podium />}
		</QuestionFormProvider>
	)
}
