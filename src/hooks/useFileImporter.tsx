import { ImporterProps, Question, QuestionData } from "@/utils/types"
import Papa from "papaparse"

export const useFileImporter = ({
	callback = () => {},
}: ImporterProps = {}) => {
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
					complete: (result) => {
						if (!result.data) {
							throw new Error("No data found")
						}
						const data = result.data as QuestionData[]
						if (data && data.length > 0) {
							const importedQuestions = data.map((item: QuestionData) => {
								const options = item.options
									.split(",")
									.map((option: string) => {
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
								} as Question
							})
							console.log(importedQuestions)
							callback(importedQuestions)
						}
					},
				})
			}
			reader.readAsText(file)
		}
	}

	const handleSaveAsCSV = (questions: Question[]) => {
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

	return { handleFileUpload, handleSaveAsCSV }
}
