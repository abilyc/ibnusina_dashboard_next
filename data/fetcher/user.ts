import { GraphQLClient } from 'graphql-request';
import { users } from '../query'

const url = process.env.NEXT_PUBLIC_GRAPH_URL!;
const client = new GraphQLClient(url);

export async function getUsers(token: string){
    const headers = {
        Authorization: token
    }
    const result = await client.request(users, headers);
    return result;
}

