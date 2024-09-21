import Podium from "@/components/Podium"
import { QuestionsForm } from "@/components/questions/QuestionsForm"
import Play from "@/components/play/Play"
import { Teams } from "@/components/Teams"
import { useApp } from "@/context/AppContext"
import { PlayProvider } from "@/context/PlayContext"
import { QuestionFormProvider } from "@/context/QuestionFormContext"
import { useState } from "react"
import { Question } from "@/utils/types"

export default function Home() {
	const { mode } = useApp()
	const [questions, setQuestions] = useState<Question[]>([])

	const getQuestionsCallback = (finalQuestions: Question[]) => {
		setQuestions(finalQuestions)
	}

	const ModeSelector = {
		questions: (
			<QuestionFormProvider>
				<QuestionsForm callback={getQuestionsCallback} />
			</QuestionFormProvider>
		),
		teams: <Teams />,
		play: (
			<PlayProvider questions={questions}>
				<Play questions={questions} />
			</PlayProvider>
		),
		podium: <Podium />,
	}

	return ModeSelector[mode]
}
