import { gql } from 'graphql-request';

const category = gql`
    query{
        allCategory{
            id
            title
        }
    }
`

export default category;