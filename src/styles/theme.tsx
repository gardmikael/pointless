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
		MuiListSubheader: {
			styleOverrides: {
				root: {
					textAlign: "center",
					fontSize: "1.25rem",
					fontWeight: "bold",
				},
			},
		},
		MuiButton: {
			defaultProps: {
				variant: "contained",
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					"&.current-score": {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: ".5rem",
						borderRadius: "50%",
						width: 200,
						backgroundColor: "#323541",
						margin: ".5rem",
						overflow: "visible",
					},
				},
			},
		},
	},
})
