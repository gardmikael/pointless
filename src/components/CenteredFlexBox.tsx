import { Box, BoxProps } from "@mui/material"
import { ReactNode } from "react"

interface CenteredFlexBoxProps extends BoxProps {
	children: ReactNode
}

export const CenteredFlexBox = ({
	children,
	...props
}: CenteredFlexBoxProps) => (
	<Box
		display='flex'
		justifyContent='center'
		alignItems='center'
		flexDirection='column'
		{...props}
	>
		{children}
	</Box>
)
