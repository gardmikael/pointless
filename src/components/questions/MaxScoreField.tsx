import { TextField } from "@mui/material"

interface MaxScoreFieldProps {
	id: string
	maxScore: number | null
	minScore: number
	hasError: (id: string) => boolean
	onChange: (value: number) => void
}

export const MaxScoreField = ({
	id,
	maxScore,
	minScore,
	hasError,
	onChange,
}: MaxScoreFieldProps) => {
	return (
		<TextField
			id={id}
			label='Max score'
			value={maxScore !== null ? maxScore : ""}
			sx={{ minWidth: 100 }}
			slotProps={{
				htmlInput: {
					type: "number",
					max: 100,
					min: minScore,
					required: true,
					step: 1,
				},
			}}
			error={hasError(id)}
			onChange={({ target: { value } }) => {
				onChange(parseInt(value))
			}}
		/>
	)
}
