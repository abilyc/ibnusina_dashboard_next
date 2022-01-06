import { SetStateAction, useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
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
    price: 2000,
    // category: randomInArray(['Android', 'Mac', 'Windows']),
    // status: randomInArray(['paid', 'out_of_date', 'in_progress']),
    category: 'Android',
    status: 'paid',
  }));
// ----------------------------------------------------------------------

export default function PostTable() {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="New Invoice" sx={{ mb: 3 }} />
      <Scrollbar sx={undefined}>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {_appInvoices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{`INV-${row.id}`}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  {/* <TableCell>{fCurrency(row.price)}</TableCell> */}
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.status === 'in_progress' && 'warning') ||
                        (row.status === 'out_of_date' && 'error') ||
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