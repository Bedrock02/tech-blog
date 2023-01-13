import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import blogStyles from './blog.styles';
import { readTime } from "../../lib/utils";

export default function Blog({ frontmatter, content}) {

  return (
    <div className="w-full">
      <div className={blogStyles.articleContainer}>
        <section className={blogStyles.header}>
          <h1 className="text-lg-2xl">{frontmatter.title}</h1>
          <p className={blogStyles.metaDesc}>{frontmatter.metaDesc}</p>
          <div className={blogStyles.metaData}>
            <span>{frontmatter.date}</span>
            <span>{`~${readTime(content)} min read`}</span>
          </div>
        </section>
        <section className={blogStyles.content}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </section>
      </div>
    </div>
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
  console.log("paths", paths)
  return {
    paths,
    fallback:false
  }
}

export async function getStaticProps({params:{slug}}){
    const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
}