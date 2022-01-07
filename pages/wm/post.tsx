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
  let publishedStatus;
  const { data: session, status } = useSession();
  if (session?.role === 'admin' || session?.role === 'editor' ){
    publishedStatus = 3;
  }else{
    publishedStatus = 2;
  }
  const { post, isLoading, isError } = usePost({token: session?.token, published: publishedStatus, timeStamp: ''});
  if (isLoading) return <div>sedang memuat</div>
  if(isError) return <div>terjadi error {console.log(isError)} </div>
  // console.log(post);

  return (
    <DashboardLayout>
      <Page title='Post | Ibnu Sina'>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid >
            {/* <TablePost dataPost={post?.allPosts} /> */}
            <TablePost dataPost={post?.allPosts!} />
          </Grid>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
