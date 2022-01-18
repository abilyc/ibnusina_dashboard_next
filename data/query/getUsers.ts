import { gql } from 'graphql-request';

const users = gql`
    query{
        users{
            id
            callName
            avatar
            role
        }
    }
`

export default users;