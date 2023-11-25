import { AppProps } from "next/app"
import "../styles/styles.css"
import { ThemeProvider } from "@emotion/react"
import { theme } from "@/styles/theme"
import { Roboto } from "next/font/google"

const roboto = Roboto({
	weight: ["400", "700", "900"],
	subsets: ["latin"],
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<main className={roboto.className} style={{ width: "100%" }}>
				<Component {...pageProps} />
			</main>
		</ThemeProvider>
	)
}

export default MyApp
