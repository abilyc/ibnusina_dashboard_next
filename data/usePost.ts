import useSWR from "swr";
import useSWRImmutable from 'swr/immutable';
import { fetchPostListAll, quickUpdatePost as quickUpdate } from "./fetcher/postFetcher";
import { PostList } from "types/post";
import { useSession } from 'next-auth/react';
import { showError } from "lib/showError";
import updatePostListCache from "./updatePostListCache";
// import { useState, useEffect } from 'react';

export function usePost(p: { timeStamp: string }) {
    const { data: session } = useSession();
    const published = session?.role === 'admin' || session?.role === 'editor' ? 3 : 2;
    const token = session?.token;
    const { timeStamp } = p;
    // const parameter = {
    //     revalidateOnFocus: false,
    //     revalidateOnMount: true,
    //     revalidateOnReconnect: false,
    //     refreshWhenOffline: false,
    //     refreshWhenHidden: false,
    //     refreshInterval: 0,
    // }
    // const { data, error, isValidating} = useSWR<{ allPosts: PostList }>([token, published, timeStamp], fetchPostListAll, parameter);
    const { data, error, isValidating } = useSWRImmutable<{ allPosts: PostList }>([token, published, timeStamp], fetchPostListAll);
    // alternatif lain: https://github.com/vercel/swr/issues/943
    return {
        post: data,
        isLoading: !error && !data,
        isValidating: isValidating,
        isError: error
    }
}

export function quickUpdatePost(params: {
    save: boolean,
    cacheData: PostList,
    toEdit: string,
    postId: string,
    changeTo: string | string[] | undefined
}) {
    const { save, cacheData, toEdit, postId, changeTo } = params;
    const { data: session } = useSession();
    const token:any = session && session.token!;
    const published = session?.role === 'admin' || session?.role === 'editor' ? 3 : 2;
    const timeStamp = '';
    const { error, data } = useSWR<{ quickUpdatePost: number }>(save ? [token, toEdit, postId, changeTo] : null, quickUpdate);
    if (error) showError(error);
    if (data?.quickUpdatePost === 1) updatePostListCache(token, postId, published, timeStamp, toEdit, changeTo, cacheData);
    // else if(data?.quickUpdatePost === 1 && toEdit === 'AUTHOR') {
    //     console.log(changeTo)
    //     // const { data } = useUser();
    //     // const toChange = userData?.users.filter(d=>d.callName === changeTo)[0]
    //     // updatePostListCache(token, postId, published, timeStamp, toEdit, toChange, cacheData);
    // }
    return data?.quickUpdatePost === 1 && true
}