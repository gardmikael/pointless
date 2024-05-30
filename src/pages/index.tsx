import Podium from "@/components/Podium"
import { CreateForm } from "@/components/create/CreateForm"
import Play from "@/components/play/Play"
import { mode } from "@/utils/misc"

const ModeSelector = {
	create: <CreateForm />,
	play: <Play />,
	podium: <Podium />,
}


export default function Home() {
	return ModeSelector[mode.value]
}
