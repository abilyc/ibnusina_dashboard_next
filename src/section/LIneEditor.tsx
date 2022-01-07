import {
    Box,
    CardHeader,
    IconButton,
    Typography,
    Card,
    Stack
} from '@mui/material';
import { width } from '@mui/system';

function LineEditor() {
    return (
        // <Box sx={{ margin: 1 }}>
        //     Hello from me
        // </Box>
        // <Card sx={{ml:3, mr:3, width:'length' }}>
        //     <CardHeader title="Edit" margin='2px' sx={{ mb: 0, padding:2}} />
        //     {/* edit */}
        // </Card>
        <Box sx={{ margin: 1, color:'red' }}>
             <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
        </Box>
    )
}

export default LineEditor;