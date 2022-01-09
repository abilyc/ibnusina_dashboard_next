import { gql } from 'graphql-request';

// Menampilkan semua postingan, terbit atau pun yang belum terbit 
const postListAll = gql`
query allPosts($published:Int!, $timeStamp:String){
  allPosts(published:$published timeStamp:$timeStamp){
    nextPost
    postResult{
      id
      title
      createdAt
      slug
      imageUrl
      published
      category{
        id
        title
      }
      tag{
        id
        title
      }
      author{
        callName
        avatar
        role
      }
    }
  }
}
  `;

export default postListAll;