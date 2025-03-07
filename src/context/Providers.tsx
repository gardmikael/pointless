"use client"
import { ThemeProvider } from "@emotion/react"
import { AppProvider } from "./AppContext"
import { TeamsProvider } from "./TeamsContext"
import { theme } from "@/styles/theme"
import { CssBaseline } from "@mui/material"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppProvider>
				<TeamsProvider>{children}</TeamsProvider>
			</AppProvider>
		</ThemeProvider>
	)
}
