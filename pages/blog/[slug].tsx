import fs from "fs";
import matter from "gray-matter";
import Post from "components/Post/Post";
import Head from "next/head";


// @ts-ignore
export default function Blog({ frontmatter, content}) {
  const { title, metaDesc, date } = frontmatter;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <Post title={title} metaDesc={metaDesc} date={date} content={content} />
      </article>
    </>
  );
}



export async function getStaticPaths() {
  // Get all the paths from slugs or file names
  const files = fs.readdirSync("posts");
  const paths = files.map((files) => ({
    params: {
      slug: files.replace(".md", ""),
    },
  }));
  
  return {
    paths,
    fallback:false
  };
}

interface GetStaticProps {
  params: {
    slug: string
  }
}
export async function getStaticProps({ params:{ slug } }: GetStaticProps){
    const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
}