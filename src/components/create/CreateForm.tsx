import { Option, Question, useQuestionStore } from "@/QuestionStore"
import { Box, Stack, Button, TextField, Paper, IconButton } from "@mui/material"
import { useRouter } from "next/router"
import Papa from "papaparse"
import { ChangeEvent } from "react"
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

	const handleAddQuestion = () => {
		const { q, a } = getRandomQuestion()
		const previousMaxScore = questions[questions.length - 1].maxScore
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
		const maxScore = questions[index].maxScore

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
	const handleMaxScoreChange = (qIndex: number, newMaxScore: any) => {
		updateMaxScore(qIndex, parseInt(newMaxScore, 10))
	}

	return (
		<Box py={5}>
			<form>
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
				{questions.map(({ question, options, maxScore }, qIndex) => {
					const qDisabled = questions.length === 1
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
											sx={{
												bgcolor: "white",
												"&:hover": {
													bgcolor: "white",
													transform: "scale(1.2)",
													transition: "transform 0.2s ease-in-out",
												},
											}}
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
											label={`Spørsmål ${qIndex + 1}`}
											value={question}
											onChange={(e) => {
												const newQuestion = e.target.value
												handleQuestionChange(qIndex, newQuestion)
											}}
										/>
										<TextField
											label='Max score'
											value={maxScore}
											onChange={(e) =>
												handleMaxScoreChange(qIndex, e.target.value)
											}
										/>
									</Box>
									{options.map(({ title, score }, oIndex) => {
										const disabled = questions[qIndex].options.length === 1
										return (
											<Stack key={`q_${qIndex}_option_${oIndex}`} spacing={2}>
												<Box
													display='flex'
													alignItems='center'
													gap={2}
													sx={{ ml: 2 }}
												>
													<TextField
														size='small'
														label={`Svaralternativ ${oIndex + 1}`}
														value={title}
														sx={{ flex: 1 }}
														autoFocus={oIndex === options.length - 1}
														onChange={(e) => {
															const newTitle = e.target.value
															handleOptionChange(qIndex, oIndex, {
																title: newTitle,
																score,
															})
														}}
													/>
													<TextField
														size='small'
														label='Score'
														value={score}
														inputProps={{
															max: questions[qIndex].maxScore,
															min: 0,
															type: "number",
															step: 1,
															pattern: "[0-9]*",
														}}
														error={
															score < 0 || score > questions[qIndex].maxScore
														}
														onChange={(e) => {
															const newScore = parseInt(e.target.value, 10)
															if (!isNaN(newScore)) {
																handleOptionChange(qIndex, oIndex, {
																	title,
																	score: newScore,
																})
															}
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
									>
										Legg til nytt svaralternativ
									</Button>
								</Stack>
							</Paper>
						</Box>
					)
				})}
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant='contained' onClick={handleAddQuestion}>
						Legg til nytt spørsmål
					</Button>

					<Button variant='outlined' onClick={handleSaveAsCSV} sx={{ ml: 2 }}>
						Lagre spill
					</Button>

					<Button
						variant='contained'
						color='success'
						sx={{ ml: "auto" }}
						onClick={() => router.push("/play")}
					>
						Spill
					</Button>
				</Box>
			</form>
		</Box>
	)
}
