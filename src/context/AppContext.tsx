import { AppContextType, Mode } from "@/utils/types"
import { ReactNode, createContext, useContext, useState } from "react"

const AppContext = createContext<AppContextType | undefined>(undefined)!

export function AppProvider({ children }: { children: ReactNode }) {
	const [mode, setMode] = useState(Mode.Questions)

	return (
		<AppContext.Provider value={{ mode, setMode }}>
			{children}
		</AppContext.Provider>
	)
}

export function useApp(): AppContextType {
	const context = useContext(AppContext)

	if (context === undefined) {
		throw new Error("useApp must be used inside an AppProvider")
	}
	return context as AppContextType
}
