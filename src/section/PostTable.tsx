import { useState } from 'react';
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
  Avatar,
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
import FormatDate from 'lib/fromatDate';

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
  const [editThis, setEditThis] = useState('');
  const [message, setMessage] = useState('');
  const [fullEdit, setFullEdit] = useState(false);
  const theme = useTheme();
  const arrayPost = dataPost?.postResult!;
  const handleButton = (e: string) => {
    const arr: string[] = e.split('<->');
    const publishOrDraft = arr[2] === '2' ? 'Simpan ke draft' : 'Terbitkan postingan ini';
    const postId = arr[1];
    if (arr[0] === 'fe') {
      setFullEdit(true);
      setEditThis('');
    } else {
      if (arr[0] === 'qe') setMessage('qe-Pilih item yang akan diedit');
      if (arr[0] === 'dl') setMessage('dl-Anda akan menghapus postingan');
      if (arr[0] === 'pi') setMessage(`pi-${publishOrDraft}`);
      setEditThis(postId);
    }
  }
  const cancelEdit = () => {
    setEditThis('');
    setFullEdit(false);
  }
  return (
    <>
      {fullEdit ? <FullEdit cancelButton={cancelEdit} /> :
        <Card>
          <CardHeader title="Post" sx={{ mb: 3 }} />
          <Scrollbar sx={undefined}>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Cover</TableCell>
                    <TableCell>Judul</TableCell>
                    <TableCell>Penulis</TableCell>
                    <TableCell>Kategori</TableCell>
                    <TableCell>Tag</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayPost.map((post) => (
                    <React.Fragment key={post.id}>
                      <TableRow>
                        <TableCell>
                          <Image ratio={undefined} src={post.imageUrl} alt="cover image" sx={{ maxWidth: 28 }} />
                        </TableCell>
                        <TableCell>
                          {/* {post.title} */}
                          <Box sx={{ display: 'flex', alignItems: 'left' }}>
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="subtitle2"> {post.title}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {FormatDate(post.createdAt)}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar alt={post.author.callName} src={post.author.avatar} />
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="subtitle2"> {capitalCase(post.author.callName)}</Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {post.author.role}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{convertToString(post.category)}</TableCell>
                        <TableCell>{convertToString(post.tag)}</TableCell>
                        <TableCell>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(post.published === 1 && 'warning') ||
                              (post.published === 2 && 'success') ||
                              'error'}
                          >
                            {post.published === 2 && 'terbit' || post.published === 1 && 'draft' || 'error'}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <MoreMenuButton
                            isPublished={post.published}
                            handleButton={handleButton}
                            id={post.id}
                          />
                        </TableCell>
                      </TableRow>
                      {editThis === post.id && <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <QuickEditor message={message} cancelEdit={cancelEdit} postData={post} />
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