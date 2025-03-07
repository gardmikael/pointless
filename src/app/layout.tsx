import { Roboto } from "next/font/google"
import { Providers } from "@/context/Providers"

const roboto = Roboto({
	weight: ["400"],
	subsets: ["latin"],
})

export const metadata = {
	title: "Pointless",
	description: "A quiz game based on the BBC show Pointless",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
