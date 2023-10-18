import { useQuestionStore } from "@/QuestionStore"
import { Box, Button, Stack, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type OptionProps = {
	title: string
	score: number
	questionIndex: number
	addable?: boolean
	disabled?: boolean
}
export const Option = ({
	title,
	score,
	questionIndex,
	addable = false,
	disabled = false,
}: OptionProps) => {
	const { addOption } = useQuestionStore((state) => state)

	const [option, setOption] = useState({
		title: title,
		score: score,
	})

	const handleAddOption = () => {
		addOption(questionIndex, option)
	}

	const handleChangeOption = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setOption((prevState) => ({ ...prevState, [name]: value }))
	}

	return (
		<Stack spacing={2}>
			<Box display='flex' gap={2}>
				<TextField
					size='small'
					name='title'
					label='Option'
					value={option.title}
					sx={{ flex: 1 }}
					onChange={handleChangeOption}
					placeholder='Add new option'
					disabled={disabled}
				/>
				<TextField
					size='small'
					type='number'
					label='Score'
					name='score'
					value={option.score}
					onChange={handleChangeOption}
					disabled={disabled}
				/>
				{addable && (
					<Button variant='contained' color='primary' onClick={handleAddOption}>
						Add
					</Button>
				)}
			</Box>
		</Stack>
	)
}
