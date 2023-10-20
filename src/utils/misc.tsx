import { Question, useQuestionStore } from "@/QuestionStore"
import Papa from "papaparse"

const randomQuestions = [
	{ q: "Statsministere i Norge etter krigen", a: "Gerhardsen" },
	{ q: "Top 50 filmer på IMDb", a: "Avengers: Endgame" },
	{ q: "Land som grenser til Østerrike", a: "Sveits" },
	{ q: "Land på 4 bokstaver", a: "Togo" },
	{ q: "Twist", a: "Banan" },
	{ q: "Medlemmer fra ABBA eller Beatles", a: "Anni-Frid" },
	{ q: "Jordens 10 største innsjøer", a: "Bajkalsjøen" },
	{ q: "Kapteiner på landslaget", a: "Henning Berg" },
	{ q: "Land som har spilt VM finale (menn)", a: "Kroatia" },
]

export const getRandomQuestion = () =>
	randomQuestions[Math.floor(Math.random() * randomQuestions.length)]

export const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

export const handleSaveAsCSV = (questions: Question[]) => {
	// Create a flattened copy of the questions array
	const flattenedQuestions = questions.map((q) => ({
		question: q.question,
		maxScore: q.maxScore,
		options: q.options.map((o) => `${o.title} (Score: ${o.score})`).join(", "),
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
