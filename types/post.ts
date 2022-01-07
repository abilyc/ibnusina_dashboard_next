// export interface DataSession {
//     data: Session;
//     status: string;
// }

export interface Session {
    id: string;
    token: string;
    callName: string;
    email: string;
    avatar: string;
    role: string;
}

export interface PostList {
    nextPost: string | undefined
    postResult: {
        id: string
        title: string
        createdAt: string
        slug: string
        published: number
        imageUrl: string
        author: {
            callName: string
            avatar: string
        }
        category: string[]
        tag:string[]
    }[] | undefined
}