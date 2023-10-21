import { AppProps } from "next/app"
import "../styles/styles.css"
import { ThemeProvider } from "@emotion/react"
import { theme } from "@/styles/theme"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
