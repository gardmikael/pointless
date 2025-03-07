import { Box, IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

interface DeleteButtonProps {
	onDelete: () => void
}

export const DeleteButton = ({ onDelete }: DeleteButtonProps) => {
	return (
		<Box
			sx={{
				position: "absolute",
				top: "-10px",
				right: "-10px",
			}}
		>
			<IconButton
				onClick={onDelete}
				color='error'
				sx={{ boxShadow: 2, bgcolor: "background.paper" }}
			>
				<DeleteIcon />
			</IconButton>
		</Box>
	)
}
