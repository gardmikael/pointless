import Podium from "@/components/Podium"
import { CreateForm } from "@/components/create/CreateForm"
import Play from "@/components/play/Play"
import { signal } from "@preact/signals-react"

type Mode = "create" | "play" | "podium"

const ModeSelector = {
	create: <CreateForm />,
	play: <Play />,
	podium: <Podium />,
}

export const mode = signal<Mode>("create")

export default function Home() {
	return ModeSelector[mode.value]
}
