import { useFetcher } from "src/contexts/FetcherContext";
import { useSWRConfig } from "swr";
import { PostList, PostData } from "types/post";

function updatePostListCache(
    token: string | undefined, postId: string,
    published: number, timeStamp: string,
    toEdit: string, changeTo: any, cacheData: PostList
) {
    const { mutate } = useSWRConfig();
    mutate([token, published, timeStamp], async () => {
        function changeThis(field: string, val: string | number | string[] | object) {
            let d = toEdit === field ? changeTo : val;
            const { data } = useFetcher()
            if(field === 'AUTHOR') d=data?.users.filter((v:any)=>v.id===d)[0]
            return d;
        }
        const updatedData = cacheData.postResult && cacheData.postResult.map((post: PostData) => (post.id === postId ?
            {
                id: post.id,
                title: changeThis('TITLE', post.title),
                createdAt: changeThis('DATE', post.createdAt),
                slug: changeThis('SLUG', post.slug),
                published: changeThis('PUBLISHED', post.published),
                imageUrl: changeThis('IMAGE', post.imageUrl),
                author: changeThis('AUTHOR', post.author),     // object
                category: changeThis('CATEGORY', post.category),   // array
                tag: changeThis('TAG', post.tag)           // array 
            } : post));
        const newPostList = {
            allPosts: {
                nextPost: cacheData.nextPost,
                postResult: updatedData
            }
        }
        return newPostList;
    }, false)
}

export default updatePostListCache;