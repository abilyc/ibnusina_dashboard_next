import { signOut } from "next-auth/react";
import { Button } from '@mui/material';

export default function StaffOnly() {
    return (
        <div>
            STAFF ONLY 
            <Button fullWidth color='inherit' variant='outlined' onClick={() => signOut({ callbackUrl: '/' })}>
                Logout
            </Button>
        </div>
    )
}