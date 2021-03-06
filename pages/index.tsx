import { Container, Typography, Box, Button } from '@mui/material';
import useSettings from 'src/hooks/useSettings';
import { useSession } from 'next-auth/react'
import { Login, StaffOnly } from 'src/components/login'
import NextLink from 'next/link';
import notAuth from 'src/auth/notAuth';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings();
  const { data: session, status } = useSession();
  if (status === "loading") return <div>tunggu sedang memuat</div>
  if (!session) return <Login />
  if (notAuth(session)) return <StaffOnly />
  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <NextLink href='/wm/post'>
        <Box sx={{ display: 'inline-flex' }}>
          <Button>
            Halaman Pengaturan Website
          </Button>
        </Box>
      </NextLink>
    </Container>
  );
}