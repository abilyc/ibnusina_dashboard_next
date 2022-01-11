import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import EditorElement from './EditorElement';
import { PostData, PostList } from 'types/post'

function QuickEditor(props: { message: string, cancelEdit: any, postData: PostData, postList: PostList }) {
    const msg = props.message.split('-');
    const code = msg[0];
    const txt = msg[1];
    return (
        <Box sx={{ ml: 0, color: 'white' }}>
            {code !== 'qe' ?
                <Typography variant="inherit" gutterBottom component="div">
                    {txt}
                    <Button>Ya</Button>
                    <Button onClick={props.cancelEdit}>batal</Button>
                </Typography> :
                <>
                    <EditorElement data={props.postData} cancel={props.cancelEdit} postList={props.postList} />
                </>
            }

        </Box>
    )
}

export default QuickEditor;