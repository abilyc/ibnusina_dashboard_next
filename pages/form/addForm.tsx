import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettings();

  return (
    <DashboardLayout>
      <Page title='Page One | Minimal-UI'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant='h3' component='h1' paragraph>
            Tambahkan formulir
          </Typography>
        </Container>
      </Page>
    </DashboardLayout>
  );
}