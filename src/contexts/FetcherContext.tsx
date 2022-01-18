import {useContext, createContext, useState, useEffect} from 'react'
import { GraphQLClient, RequestDocument } from 'graphql-request'
import { useSession } from 'next-auth/react'
import { category, users } from 'data/query';
import { ActionButton, Author, Category, PostData, PostList } from '../../types/post'
import useSWRImmutable from 'swr/immutable'
import useSWR from 'swr';

const FetcherContext = createContext<any>(null);

type ProvProps = {
    children: JSX.Element
}

export function FetcherProvider({ children }: ProvProps){
    const data = useProvideFetcher()

    return(
        <FetcherContext.Provider value={data}>
            {children}
        </FetcherContext.Provider>
    )
}

export const useFetcher = () => useContext(FetcherContext)

function useProvideFetcher () {
    const [typ, setTyp] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    
    const getToken = () => {
        const { data: session } = useSession()
        const token: any = session && session.token!
        return token
    }

    const fetchData = async (withToken: boolean = true) => {
        const url = process.env.NEXT_PUBLIC_GRAPH_URL!;
        const client = new GraphQLClient(url);
        const headers = () => {
           return withToken ? {Authorization: getToken()} : {}
        }

        const query = (): RequestDocument => {
            switch(typ){
                case 'users':
                    return users
                case 'category':
                    return category
                default:
                    return users
            }
        }

        return typ!== '' ? await client.request(query(), headers) : []
    }

    
    const { data: initData, error: initError } = useSWRImmutable<Author | PostList | Category>([typ, getToken()], async() => await fetchData())

    const { data } = useSWR<Author | PostList | Category>([typ, getToken()])
    
    useEffect(()=>{
        if(initData || initError) setLoading(false);
        if(!initData && !initError) setLoading(true); else setLoading(false);
    },[initData,initError])
    
    return {
        typ,
        data,
        error: initError,
        getToken,
        fetchData,
        setLoading,
        setType: setTyp,
        isLoading: loading
    }
}