import Podium from "@/components/Podium"
import { CreateForm } from "@/components/questions/QuestionsForm"
import Play from "@/components/play/Play"
import { Mode } from "@/utils/types"
import { signal } from "@preact/signals-react"

const ModeSelector = {
	questions: <CreateForm />,
	play: <Play />,
	podium: <Podium />,
}

export const mode = signal<Mode>(Mode.Questions)

export default function Home() {
	return ModeSelector[mode.value]
}
