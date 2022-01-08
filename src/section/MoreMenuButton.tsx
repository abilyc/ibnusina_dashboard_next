import { useState } from 'react';
import React from 'react';
import {
    Divider,
    MenuItem,
    IconButton,
} from '@mui/material';
import Iconify from 'src/components/Iconify';
import MenuPopover from 'src/components/MenuPopover';

function MoreMenuButton({ isPublished, handleButton, id }: { isPublished: number, handleButton: any, id: string }) {
    const [open, setOpen] = useState(null);

    const handleOpen = (event: { currentTarget: any }) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleMenuButton = (event: string) => {
        handleButton(event +"<->"+ id);
        setOpen(null);
    }

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };

    const publishIt = isPublished === 2 ? 'Arsipkan' : 'Terbitkan';

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
                <MenuItem onClick={() => handleMenuButton('qe')}>
                    <Iconify icon={'eva:download-fill'} sx={{ ...ICON }} />
                    Quick Edit
                </MenuItem>

                <MenuItem onClick={() => handleMenuButton('fe')}>
                    <Iconify icon={'eva:printer-fill'} sx={{ ...ICON }} />
                    Full Edit
                </MenuItem>

                <MenuItem onClick={() => handleMenuButton('pi')}>
                    <Iconify icon={'eva:share-fill'} sx={{ ...ICON }} />
                    {publishIt}
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem sx={{ color: 'error.main' }} onClick={() => handleMenuButton('dl')}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
                    Delete
                </MenuItem>
            </MenuPopover>
        </>
    );
}

export default MoreMenuButton