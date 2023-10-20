import { createTheme } from "@mui/material/styles"

/* declare module "@mui/material/styles/createPalette" {
	interface Palette {
		custom: Palette["primary"]
	}
	interface PaletteOptions {
		custom?: PaletteOptions["primary"]
	}
} */

/* const customColors = {
	mintCream: "#F6FBFB",
	spanishGray: "#9E9E9E",
	silverSand: "#C4C4C4",
} */

export const theme = createTheme({
	typography: {
		fontFamily: [
			//"Source Sans Pro",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
		].join(","),
	},
	components: {
		MuiPaper: {
			defaultProps: {
				elevation: 3,
				sx: {
					padding: 4,
					mb: 2,
					position: "relative",
				},
			},
		},
	},
})
