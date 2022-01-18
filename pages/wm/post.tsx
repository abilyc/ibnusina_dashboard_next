import { Container, Grid } from '@mui/material';
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
import { FetcherProvider } from 'src/contexts/FetcherContext';


export default function PageOne() {
  const { themeStretch } = useSettings();
  const { post, isLoading, isError, isValidating } = usePost({timeStamp: '' });
  const loadComponent = (isLoading || isValidating ) && <div>sedang memuat</div>;
  const errComponent = isError && <div>terjadi error {showError(isError)} </div>
  return (
    <DashboardLayout>
      <Page title='Post | Ibnu Sina'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid >
            <FetcherProvider>
              {loadComponent || errComponent || <TablePost dataPost={post?.allPosts!}/>}
            </FetcherProvider>
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
