interface PostMeta {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
}

interface PostInfo {
    meta: PostMeta;
    content: string;
}

interface PageData {
    slug: string,
    frontmatter: Record<string, any>
  }

export type {
    PostMeta,
    PostInfo,
    PageData
}