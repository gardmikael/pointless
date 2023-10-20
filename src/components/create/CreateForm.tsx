import { Option, useQuestionStore } from "@/QuestionStore"
import { Box, Stack, Button, TextField, Paper, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import Papa from "papaparse"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import { getRandomQuestion } from "@/utils/misc"

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

	const handleSaveAsCSV = () => {
		// Create a flattened copy of the questions array
		const flattenedQuestions = questions.map((q) => ({
			question: q.question,
			maxScore: q.maxScore,
			options: q.options
				.map((o) => `${o.title} (Score: ${o.score})`)
				.join(", "),
		}))

		const csvData = Papa.unparse(flattenedQuestions, {
			header: true,
		})

		const blob = new Blob([csvData], { type: "text/csv" })
		const url = URL.createObjectURL(blob)
		const a = document.createElement("a")
		a.style.display = "none"
		a.href = url
		a.download = "questions.csv"
		document.body.appendChild(a)
		a.click()
		window.URL.revokeObjectURL(url)
	}

	const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			return
		}
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (event) => {
				const result = event.target?.result as string | null
				if (!result) {
					return
				}
				Papa.parse(result, {
					header: true,
					complete: (parsed: any) => {
						if (parsed.data && parsed.data.length > 0) {
							const importedQuestions = parsed.data.map((item: any) => {
								const options = item.options.split(",").map((option: any) => {
									const parts = option.trim().split(" (Score: ")
									return {
										title: parts[0],
										score: parseInt(parts[1].replace(")", ""), 10),
									}
								})

								return {
									question: item.question,
									maxScore: parseInt(item.maxScore, 10),
									options,
								}
							})

							useQuestionStore.setState({ questions: importedQuestions })
						}
					},
				})
			}
			reader.readAsText(file)
		}
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
			<label htmlFor='csvFile'>
				<Button variant='outlined' component='span' sx={{ mb: 2 }}>
					Importer spill
				</Button>
				<input
					type='file'
					accept='.csv'
					id='csvFile'
					style={{ display: "none" }}
					onChange={handleFileUpload}
				/>
			</label>
			<form
				id='questions'
				ref={formRef}
				noValidate
				onChange={checkFormValidity}
			>
				{questions.map(({ question, options, maxScore }, qIndex) => {
					const qDisabled = questions.length === 1
					const minScore = Math.max(
						...questions[qIndex].options.map(({ score }) => score || 0)
					)
					const qId = `q${qIndex}`
					const qmsId = `qms${qIndex}`
					return (
						<Box key={`question_${qIndex}`}>
							<Paper
								elevation={3}
								sx={{ padding: 4, mb: 2, position: "relative" }}
							>
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
											inputRef={inputRef}
											id={qId}
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
											label='Max score'
											value={maxScore || ""}
											id={qmsId}
											sx={{ minWidth: 100 }}
											inputProps={{
												type: "number",
												max: 100,
												min: minScore,
												required: true,
												step: 1,
											}}
											error={hasError(qmsId)}
											onChange={({ target: { value } }) =>
												handleMaxScoreChange(qIndex, parseInt(value) || null)
											}
										/>
									</Box>
									{options.map(({ title, score }, oIndex) => {
										const disabled = questions[qIndex].options.length === 1
										const oid = `o${qIndex}_${oIndex}`
										const otid = `ot${qIndex}_${oIndex}`
										const maxScore = questions[qIndex].maxScore
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
														value={score || ""}
														inputProps={{
															type: "number",
															required: true,
															max: maxScore,
															min: 0,
														}}
														error={hasError(oid)}
														sx={{ width: 80 }}
														onChange={({ target: { value } }) => {
															const newScore = parseInt(value) || null
															handleOptionChange(qIndex, oIndex, {
																title,
																score: newScore,
															})
														}}
													/>

													<IconButton
														onClick={() => handleRemoveOption(qIndex, oIndex)}
														disabled={disabled}
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

					<Button variant='outlined' onClick={handleSaveAsCSV} sx={{ ml: 2 }}>
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
