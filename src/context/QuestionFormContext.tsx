import { useQuestionForm } from "@/hooks/useQuestionForm"
import { QuestionFormContextType } from "@/utils/types"
import { ReactNode, createContext, useContext } from "react"

const QuestionFormContext = createContext<QuestionFormContextType | undefined>(
	undefined
)!

export function QuestionFormProvider({ children }: { children: ReactNode }) {
	const {
		questions,
		formRef,
		formIsValid,
		setQuestions,
		handleAddRandomQuestion,
		handleOptionChange,
		handleAddOption,
		handleQuestionChange,
		handleRemoveOption,
		checkFormValidity,
		handleRemoveQuestion,
		handleMaxScoreChange,
		hasError,
		getNewRandomOption,
	} = useQuestionForm()

	return (
		<QuestionFormContext.Provider
			value={{
				questions,
				formRef,
				formIsValid,
				setQuestions,
				handleAddRandomQuestion,
				handleOptionChange,
				handleAddOption,
				handleQuestionChange,
				handleRemoveOption,
				checkFormValidity,
				handleRemoveQuestion,
				handleMaxScoreChange,
				hasError,
				getNewRandomOption,
			}}
		>
			{children}
		</QuestionFormContext.Provider>
	)
}

export function useQuestions(): QuestionFormContextType {
	const context = useContext(QuestionFormContext)

	if (context === undefined) {
		throw new Error(
			"useQuestionForm must be used inside an QuestionFormProvider"
		)
	}
	return context as QuestionFormContextType
}
