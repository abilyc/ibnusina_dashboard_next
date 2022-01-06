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
      <Page title='Post | Ibnu Sina'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          hello
        </Container>
      </Page>
    </DashboardLayout>
  );
}