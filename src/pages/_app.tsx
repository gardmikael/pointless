import { AppProps } from "next/app"
import "../styles/styles.css"
import { ThemeProvider } from "@emotion/react"
import { theme } from "@/styles/theme"
import { CssBaseline } from "@mui/material"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
