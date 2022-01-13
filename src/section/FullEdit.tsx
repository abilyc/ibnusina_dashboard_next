import TextEditor from './TextEditor';

import {
  Card,
  Container,
  Button,
  Typography,
  CardHeader,
  CardContent,
} from '@mui/material';
// hooks
import useSettings from 'src/hooks/useSettings';

import Test from './TextEditor/Test'


function FullEdit({ cancelButton }: { cancelButton: any }) {
  const { themeStretch } = useSettings();
  return (
    // <Container>
    //   <Typography component='h3' sx={{ mb: 5 }}>
    //     Update <Button onClick={cancelButton}>Kembali</Button>
    //   </Typography>
    //   <Card>
    //     <CardHeader title='Editor' />
    //     <CardContent sx={{ background: "grey", color:'black' }}>
    //       <TextEditor />
    //     </CardContent>
    //   </Card>
    // </Container>
    <Test cancel={cancelButton}/>
  );
}

export default FullEdit;