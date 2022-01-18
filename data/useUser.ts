import { useSession } from 'next-auth/react';
import useSWRImmutable from 'swr/immutable';
import { Author } from 'types/post';
import { getUsers } from './fetcher/user';

export function useUser(){
    const { data: session } = useSession();
    const token:any = session && session.token!;
    const { data, error } = useSWRImmutable<{ users: Author }>([token], getUsers);
    return {data, error};
}