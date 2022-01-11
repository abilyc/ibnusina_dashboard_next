import { gql } from 'graphql-request';

const quicUpdatePost = gql`
mutation quickUpdatePost($edit: ToEdit!, $postId: ID!, $changeTo: String!) {
  quickUpdatePost(edit: $edit, postId: $postId, changeTo: $changeTo)
}
`;
export default quicUpdatePost;