import { paperClasses } from "@mui/material/Paper"
import { createTheme } from "@mui/material/styles"

declare module "@mui/material/Paper" {
	interface PaperPropsVariantOverrides {
		countdown1: true
		countdown2: true
	}
}

export const theme = createTheme({
	palette: {
		background: {
			default: "rgb(206, 204, 248)",
		},
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
			styleOverrides: {
				root: {
					[`&.${paperClasses.root}`]: {
						"@keyframes outer-container": {
							"0%": {
								backgroundPosition: "51% 0%",
							},
							"50%": {
								backgroundPosition: "50% 100%",
							},
							"100%": {
								backgroundPosition: "51% 0%",
							},
						},
						"@keyframes inner-container": {
							"0%": {
								backgroundPosition: "50% 0%",
							},
							"50%": {
								backgroundPosition: "51% 100%",
							},
							"100%": {
								backgroundPosition: "50% 0%",
							},
						},
						"&.MuiPaper-countdown1": {
							background: "linear-gradient(271deg, #f0859d, #e50c54)",
							backgroundSize: "400% 400%",
							animation: "outer-container 50s ease infinite",
						},
						"&.MuiPaper-countdown2": {
							background: "linear-gradient(0deg, #11125d, #1716df)",
							backgroundSize: "400% 400%",
							padding: "0.5rem",
							animation: "inner-container 11s ease infinite",
						},
					},
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
		MuiSvgIcon: {
			styleOverrides: {
				root: {
					color: "inherit",
				},
			},
		},
	},
})
