import { handleFileUpload } from "@/utils/misc"
import { Button } from "@mui/material"

export const FileUploader = () => {
	return (
		<label htmlFor='csvFile'>
			<Button variant='outlined' component='span' sx={{ mb: 2 }}>
				Importer spill
			</Button>
			<input
				type='file'
				accept='.csv'
				id='csvFile'
				style={{ display: "none" }}
				onChange={handleFileUpload}
			/>
		</label>
	)
}
