import useSWR, { useSWRConfig } from "swr";
import { fetchPostListAll } from "./fetcher/postFetcher";
import { PostList } from "types/post";

export function usePost(p: { token: any, published: number, timeStamp: string }) {
    // console.log(p.token, p.published, p.timeStamp);
    const { token, published, timeStamp } = p;
    const { error, data } = useSWR<{ allPosts: PostList }>([token, published, timeStamp], fetchPostListAll,
        {
            revalidateOnFocus: false,
            revalidateOnMount: true
        });
    // console.log('dari usePost', data);
    return {
        post: data,
        isLoading: !error && !data,
        isError: error
    }
}