import { Option, useQuestionStore } from "@/QuestionStore"
import { Box, Stack, Button, TextField, Paper, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { getRandomQuestion, handleSaveAsCSV } from "@/utils/misc"
import { FileUploader } from "./FileUploader"

export const CreateForm = () => {
	const {
		questions,
		addQuestion,
		addOption,
		removeOption,
		removeQuestion,
		updateQuestion,
		updateOption,
		updateMaxScore,
	} = useQuestionStore()

	const router = useRouter()
	const [formIsValid, setFormIsValid] = useState(true)
	const formRef = useRef<HTMLFormElement | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const handleAddQuestion = () => {
		const { q, a } = getRandomQuestion()
		const previousMaxScore = questions[questions.length - 1].maxScore!
		addQuestion({
			question: q,
			options: [
				{
					title: a,
					score: previousMaxScore,
				},
			],
			maxScore: previousMaxScore,
		})
	}

	const handleAddOption = (index: number) => {
		const maxScore = questions[index].maxScore!
		addOption(index, { title: "Nytt svaralternativ", score: maxScore })
	}

	const handleQuestionChange = (qIndex: number, newQuestion: string) => {
		updateQuestion(qIndex, newQuestion)
	}

	const handleOptionChange = (
		qIndex: number,
		oIndex: number,
		newOption: Option
	) => {
		updateOption(qIndex, oIndex, newOption)
	}

	const handleRemoveOption = (qIndex: number, oIndex: number) => {
		removeOption(qIndex, oIndex)
	}

	const handleRemoveQuestion = (qIndex: number) => {
		removeQuestion(qIndex)
	}

	const handleMaxScoreChange = (qIndex: number, newMaxScore: number | null) => {
		updateMaxScore(qIndex, newMaxScore)
	}

	const checkFormValidity = () => {
		const isValid = !!formRef?.current?.checkValidity()
		setFormIsValid(isValid)
	}

	const hasError = (id: string) => {
		const element = formRef?.current?.querySelector(
			`#${id}`
		) as HTMLInputElement

		return element ? !element.checkValidity() : false
	}

	useEffect(() => {
		checkFormValidity()
	}, [questions])

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select()
		}
	}, [])

	return (
		<Box py={5}>
			<FileUploader />
			<form
				id='questions'
				ref={formRef}
				noValidate
				onChange={checkFormValidity}
			>
				{questions.map(({ question, options, maxScore }, qIndex) => {
					const qDisabled = questions.length === 1
					const minScore = Math.max(
						...questions[qIndex].options.map(({ score }) => score || 3)
					)
					const qId = `q${qIndex}`
					const qmsId = `qms${qIndex}`
					return (
						<Box key={`question_${qIndex}`}>
							<Paper>
								{!qDisabled && (
									<Box
										sx={{ position: "absolute", top: "-10px", right: "-10px" }}
									>
										<IconButton
											className='delete-btn'
											onClick={(e) => handleRemoveQuestion(qIndex)}
										>
											<DeleteIcon color='error' />
										</IconButton>
									</Box>
								)}

								<Stack spacing={3}>
									<Box display='flex' gap={2}>
										<TextField
											fullWidth
											id={qId}
											inputRef={inputRef}
											label={`Spørsmål ${qIndex + 1}`}
											value={question}
											autoFocus={true}
											onFocus={(e) => e.target.select()}
											inputProps={{
												required: true,
											}}
											error={hasError(qId)}
											helperText={hasError(qId) && "Kan ikke være tom"}
											onChange={({ target: { value } }) =>
												handleQuestionChange(qIndex, value)
											}
										/>
										<TextField
											id={qmsId}
											label='Max score'
											value={maxScore !== null ? maxScore : ""}
											sx={{ minWidth: 100 }}
											inputProps={{
												type: "number",
												max: 100,
												min: minScore,
												required: true,
												step: 1,
											}}
											error={hasError(qmsId)}
											onChange={({ target: { value } }) => {
												const newScore = parseInt(value)
												handleMaxScoreChange(
													qIndex,
													isNaN(newScore) ? null : newScore
												)
											}}
										/>
									</Box>
									{options.map(({ title, score }, oIndex) => {
										const disabled = questions[qIndex].options.length === 1
										const oid = `o${qIndex}_${oIndex}`
										const otid = `ot${qIndex}_${oIndex}`
										const maxScore = questions[qIndex].maxScore!
										return (
											<Stack key={`q_${qIndex}_option_${oIndex}`} spacing={2}>
												<Box
													display='flex'
													alignItems='flex-start'
													gap={2}
													sx={{ ml: 2 }}
												>
													<TextField
														id={otid}
														size='small'
														label={`Svaralternativ ${oIndex + 1}`}
														value={title}
														sx={{ flex: 1 }}
														autoFocus={oIndex !== 0}
														onFocus={(e) => e.target.select()}
														inputProps={{
															required: true,
														}}
														error={hasError(otid)}
														helperText={hasError(otid) && "Kan ikke være tom."}
														onChange={({ target: { value } }) => {
															handleOptionChange(qIndex, oIndex, {
																title: value,
																score,
															})
														}}
													/>
													<TextField
														id={oid}
														size='small'
														label='Score'
														value={score !== null ? score : ""}
														inputProps={{
															type: "number",
															required: true,
															max: maxScore,
															min: 0,
														}}
														error={hasError(oid)}
														sx={{ width: 80 }}
														onChange={({ target: { value } }) => {
															const newScore = parseInt(value)
															handleOptionChange(qIndex, oIndex, {
																title,
																score: isNaN(newScore) ? null : newScore,
															})
														}}
													/>

													<IconButton
														onClick={() => handleRemoveOption(qIndex, oIndex)}
														disabled={disabled}
														tabIndex={-1}
													>
														<DeleteIcon
															color={`${disabled ? "disabled" : "error"}`}
														/>
													</IconButton>
												</Box>
											</Stack>
										)
									})}
									<Button
										variant='outlined'
										onClick={() => handleAddOption(qIndex)}
										disabled={!formIsValid}
									>
										Legg til nytt svaralternativ
									</Button>
								</Stack>
							</Paper>
						</Box>
					)
				})}
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button
						variant='contained'
						onClick={handleAddQuestion}
						disabled={!formIsValid}
					>
						Legg til nytt spørsmål
					</Button>

					<Button
						variant='outlined'
						onClick={() => handleSaveAsCSV(questions)}
						sx={{ ml: 2 }}
					>
						Lagre spill
					</Button>

					<Button
						variant='contained'
						color='success'
						sx={{ ml: "auto" }}
						disabled={!formIsValid}
						onClick={() => {
							if (formIsValid) {
								router.push("/play")
							}
						}}
					>
						Spill
					</Button>
				</Box>
			</form>
		</Box>
	)
}
