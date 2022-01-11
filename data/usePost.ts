import useSWR, { useSWRConfig } from "swr";
import useSWRImmutable from 'swr/immutable';
import { fetchPostListAll, quickUpdatePost as quickUpdate } from "./fetcher/postFetcher";
import { PostList } from "types/post";
import { useSession } from 'next-auth/react';
import { showError } from "lib/showError";
import { useState, useEffect } from 'react';

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
    changeTo: string | undefined
}) {
    const { save, cacheData, toEdit, postId, changeTo } = params;
    const { data: session } = useSession();
    const token = session?.token;
    const published = session?.role === 'admin' || session?.role === 'editor' ? 3 : 2;
    const timeStamp = '';
    console.log('save:', save);
    const { error, data } = useSWR<{ quickUpdatePost: number }>(save ? [token, toEdit, postId, changeTo] : null, quickUpdate);
    if (error) showError(error);
    if (data) {
        const { mutate } = useSWRConfig();
        mutate([token, published, timeStamp], async () => {
            const updatedData = cacheData.postResult && cacheData.postResult.map(x => (x.id === postId ?
                {
                    id: x.id,
                    title: changeTo,
                    createdAt: x.createdAt,
                    slug: x.slug,
                    published: x.published,
                    imageUrl: x.imageUrl,
                    author: x.author,
                    category: x.category,
                    tag: x.tag
                } : x));
            const newPostList = {
                allPosts: {
                    nextPost: cacheData.nextPost,
                    postResult: updatedData
                }
            }
            return newPostList;
        }, false)
    }

    return {
        updateData: data?.quickUpdatePost && true,
        // isLoading: !error && !data && true,
        // isError: error && true
    }

}