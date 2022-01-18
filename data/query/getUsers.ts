import { gql } from 'graphql-request';

const users = gql`
    query{
        users{
            id
            callName
            avatar
        }
    }
`

export default users;