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
            role: string
        }
        category: string[]
        tag: string[]
    }[] | undefined
}

export interface ActionButton {
    id: string;
    isPublished: number;
    handleButton: any;
}