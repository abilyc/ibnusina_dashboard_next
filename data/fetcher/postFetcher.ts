import { GraphQLClient } from 'graphql-request';
import { postList, postContent, postListAll, quicUpdatePost as quickUpdate } from '../query';
// import { getSession } from 'next-auth/react';
import getToken from 'src/auth/getToken';
const url = process.env.NEXT_PUBLIC_GRAPH_URL!;


export async function fetchPostList() {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url, { headers });
  const res = await client.request(postList);
  return res;
}
export async function fetchPostListAll(token: string, published: number, timeStamp: string) {
  console.log('hi dari fetchPostListAll');
  // const token:string = await getToken();
  const headers = {
    Authorization: token
  }
  const client = new GraphQLClient(url);
  const res = await client.request(postListAll, { published, timeStamp }, headers);
  // console.log('dari fetchpost list', res);
  // console.log('ini', res);
  return res;
}
export async function fetchPostContent(slug: String) {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url);
  const res = await client.request(postContent, { slug }, headers);
  return res;
}

export async function fetchAllPostId() {
  const headers = {
    Authorization: ''
  }
  const client = new GraphQLClient(url, { headers });
  const res = await client.request(postList);
  return res.loadPosts.postResult.map((d: { slug: string; }) => {
    return {
      params: {
        slug: d.slug
      }
    }
  })
}

export async function quickUpdatePost(token:string, toEdit: string, postId: string, changeTo: string ) {
  // const token:string = await getToken();
  const headers = {Authorization: token};
  const client = new GraphQLClient(url);
  const res = await client.request(quickUpdate, { edit:toEdit, postId, changeTo }, headers);
  return res;
}