import { z } from "zod"

export const questionFieldSchema = z.object({
	id: z.string(),
	question: z.string().min(1, "Kan ikke være tom"),
})

export type QuestionFieldSchema = z.infer<typeof questionFieldSchema>
