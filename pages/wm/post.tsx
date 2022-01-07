import { Container, Typography, Grid } from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import TablePost from 'src/section/PostTable';
// data 
import { usePost} from 'data/usePost';
import { useSession } from 'next-auth/react'


export default function PageOne() {
  const { themeStretch } = useSettings();
  const { data: session, status } = useSession();
  const { post, isLoading, isError } = usePost({token: session?.token, published: 3, timeStamp: ''});
  if (isLoading) return <div>sedang memuat</div>
  if(isError) return <div>terjadi error</div>
  // console.log(post);

  return (
    <DashboardLayout>
      <Page title='Post | Ibnu Sina'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid >
            <TablePost />
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
