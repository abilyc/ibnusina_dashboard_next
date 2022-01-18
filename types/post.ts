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
            id: string
            callName: string
            avatar: string
            role: string
        }
        category: string[]
        tag: string[]
    }[] | undefined
}

export interface PostData {
    id: string
    title: string
    createdAt: string
    slug: string
    published: number
    imageUrl: string
    author: {
        id: string
        callName: string
    }
    category: string[]
    tag: string[]
}

export interface ActionButton {
    id: string;
    isPublished: number;
    handleButton: any;
}

export interface Author {
    users: {
        id: string | null;
        callName: string | null;
        avatar: string | null;
        role: string | null;
    }[]
}

export interface Category {
    allCategory: {
        id: string | null;
        title: string | null;
    }
}