import {
    Box,
    CardHeader,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Typography,
    Card,
    Stack
} from '@mui/material';
import EditorElement from './EditorElement';

function QuickEditor(props: { message: string, cancelEdit: any }) {
    const msg = props.message.split('-');
    const code = msg[0];
    const txt = msg[1];
    return (
        <Box sx={{ ml: 0, color: 'yellow' }}>
            {code !== 'qe' ?
                <Typography variant="inherit" gutterBottom component="div">
                    {txt}
                    <Button >Ya</Button>
                    <Button onClick={props.cancelEdit}>batal</Button>
                </Typography> :
                <>
                <Typography variant='inherit'>{txt}<Button onClick={props.cancelEdit}>batal</Button></Typography>
                <EditorElement/>
                </>
            }
            
        </Box>
    )
}

export default QuickEditor;