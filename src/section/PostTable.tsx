import { SetStateAction, useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import Image from 'src/components/Image';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  IconButton,
  TableContainer,
  Typography,
  Stack
} from '@mui/material';
// utils
// import { fCurrency } from 'src/utils/formatNumber';
// _mock_
// import { _appInvoices } from '../../../../_mock';
// components
import Label from 'src/components/Label';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import MenuPopover from 'src/components/MenuPopover';

const _appInvoices = [...Array(5)].map((_, index) => ({
  id: `${Date.now() + index}`,
  title: 'Diisi judul postingan',
  author: 'Mahmud',
  category: "belajar",
  // category: randomInArray(['Android', 'Mac', 'Windows']),
  // status: randomInArray(['paid', 'out_of_date', 'in_progress']),
  tag: 'matematika',
  status: 2 ? 'terbit' : 'draft',
}));
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

export default function PostTable() {
  const theme = useTheme();

  return (
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
              {_appInvoices.map((row) => (
                <>
                <TableRow key={row.id}>
                  {/* <TableCell>{`INV-${row.id}`}</TableCell> */}
                  <TableCell>
                    <ItemBlockStyle sx={{ minWidth: 120 }}>
                      <Image disabledEffect ratio={undefined} alt={'amir'} src='https://minimal-assets-api.vercel.app/assets/icons/ic_flag_us.svg' sx={{ width: 28, mr: 1 }} />
                      <Typography variant="subtitle2">{row.title}</Typography>
                    </ItemBlockStyle>
                  </TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  {/* <TableCell>{fCurrency(row.price)}</TableCell> */}
                  <TableCell>{row.tag}</TableCell>
                  <TableCell>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'draft' && 'warning') ||
                        (row.status === 'undefined' && 'error') ||
                        'success'
                      }
                    >
                      {sentenceCase(row.status)}
                    </Label>
                  </TableCell>
                  
                  <TableCell align="right">
                    <MoreMenuButton />
                  </TableCell>
                </TableRow>
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell align="right">Amount</TableCell>
                          <TableCell align="right">Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </Box>
              </>
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
    </Card>
  );
}

// ----------------------------------------------------------------------

function MoreMenuButton() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event: { currentTarget: any }) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  return (
    <>
      <IconButton size="large" onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} sx={undefined} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -0.5,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
          Download
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
          Print
        </MenuItem>

        <MenuItem>
          <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}