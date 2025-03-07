import { createTheme } from "@mui/material/styles"

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
