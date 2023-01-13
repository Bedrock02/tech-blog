interface PostMeta {
    title: string,
    metaDesc: string,
    date: string,
    tags: string[],
}

interface PostInfo {
    meta: PostMeta;
    content: string;
}

interface PageData {
    slug: string,
    frontmatter: Record<string, any>
}

interface Post {
    slug: string,
    data: PostMeta
}

export type {
    Post,
    PostMeta,
    PostInfo,
    PageData
}