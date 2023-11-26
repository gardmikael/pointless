import Podium from "@/components/Podium"
import { CreateForm } from "@/components/create/CreateForm"
import Play from "@/components/play/Play"
import { Mode } from "@/utils/types"
import { signal } from "@preact/signals-react"

const ModeSelector = {
	create: <CreateForm />,
	play: <Play />,
	podium: <Podium />,
}

export const mode = signal<Mode>("create")

export default function Home() {
	return ModeSelector[mode.value]
}
