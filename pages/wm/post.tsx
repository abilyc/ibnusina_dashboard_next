import { Container, Typography, Grid } from '@mui/material';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// hooks
import useSettings from 'src/hooks/useSettings';
// components
import Page from 'src/components/Page';
import TablePost from 'src/section/PostTable';
// data 
import { usePost } from 'data/usePost';
import { useSession } from 'next-auth/react';
import { showError } from 'lib/showError';


export default function PageOne() {
  const { themeStretch } = useSettings();
  const { data: session, status } = useSession();
  const publishedStatus = session?.role === 'admin' || session?.role === 'editor' ? 3 : 2;
  const { post, isLoading, isError } = usePost({ token: session?.token, published: publishedStatus, timeStamp: '' });
  const loadComponent = isLoading && <div>sedang memuat</div>;
  const errComponent = isError && <div>terjadi error {showError(isError)} </div>
  return (
    <DashboardLayout>
      <Page title='Post | Ibnu Sina'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid >
            {loadComponent || errComponent || <TablePost dataPost={post?.allPosts!} />}
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
