import { TextField } from "@mui/material"
import { RefObject } from "react"

interface QuestionFieldProps {
	id: string
	question: string
	index: number
	inputRef: RefObject<HTMLInputElement>
	hasError: (id: string) => boolean
	onChange: (value: string) => void
}

export const QuestionField = ({
	id,
	question,
	index,
	inputRef,
	hasError,
	onChange,
}: QuestionFieldProps) => {
	return (
		<TextField
			fullWidth
			id={id}
			inputRef={inputRef}
			label={`Spørsmål ${index + 1}`}
			value={question}
			autoFocus={true}
			onFocus={(e) => e.target.select()}
			slotProps={{
				htmlInput: {
					type: "text",
					required: true,
				},
			}}
			error={hasError(id)}
			helperText={hasError(id) && "Kan ikke være tom"}
			onChange={({ target: { value } }) => onChange(value)}
		/>
	)
}
