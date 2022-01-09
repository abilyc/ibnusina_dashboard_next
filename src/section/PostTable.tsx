import { SetStateAction, useState } from 'react';
import { capitalCase } from 'change-case';
// @mui
import Image from 'src/components/Image';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
  Typography,
  Stack
} from '@mui/material';
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import { PostList } from 'types/post';
import QuickEditor from './QuickEditor';
import FullEdit from './FullEdit';
import MoreMenuButton from './MoreMenuButton';

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props) => <Stack direction="row" alignItems="center" {...props} />)({
  minWidth: 72,
  flex: '1 1',
});

const ItemIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

function convertToString(arr: any) {
  const x = arr.map((a: { title: string; }) => " " + a.title);
  return x.toString();
}

export default function PostTable({ dataPost }: { dataPost: PostList }) {
  const [editThis, setEditThis] = useState();
  const [message, setMessage] = useState('');
  const [fullEdit, setFullEdit] = useState(false);
  const theme = useTheme();
  const arrayPost = dataPost?.postResult!;
  const handleButton = (e: any) => {
    const arr = e.split('<->');
    if (arr[0] === 'fe') {
      setFullEdit(true);
      setEditThis(undefined);
    } else {
      if (arr[0] === 'qe') setMessage('Pilih item yang akan diedit');
      if (arr[0] === 'del') setMessage('Anda akan menghapus postingan ini');
      if (arr[0] === 'pi') setMessage('Anda akan menerbitkan postingan ini');
      setEditThis(arr[1]);
    }
  }
  const cancelEdit = (e: any) => {
    setEditThis(undefined);
  }
  return (
    <>
      {fullEdit ? <FullEdit /> :
        <Card>
          <CardHeader title="Post" sx={{ mb: 3 }} />
          <Scrollbar sx={undefined}>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Judul</TableCell>
                    <TableCell>Penulis</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayPost.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          <ItemBlockStyle sx={{ minWidth: 120 }}>
                            <Image disabledEffect ratio={undefined} alt={row.author.callName} src={row.author.avatar} sx={{ width: 28, mr: 1 }} />
                            <Typography variant="subtitle2">{capitalCase(row.author.callName)}</Typography>
                          </ItemBlockStyle>
                        </TableCell>
                        <TableCell>{convertToString(row.category)}</TableCell>
                        <TableCell>{convertToString(row.tag)}</TableCell>
                        <TableCell>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(row.published === 1 && 'warning') ||
                              (row.published === 2 && 'success') ||
                              'error'}
                          >
                            {row.published === 2 && 'terbit' || row.published === 1 && 'draft' || 'error'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenuButton isPublished={row.published} handleButton={handleButton} id={row.id} />
                        </TableCell>
                      </TableRow>
                      {editThis === row.id && <TableRow>
                        <TableCell>
                          <QuickEditor />
                        </TableCell>
                      </TableRow>}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider />

          <Box sx={{ p: 2, textAlign: 'right' }}>
            <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} sx={undefined} />}>
              View All
            </Button>
          </Box>
        </Card>}
    </>
  );
}