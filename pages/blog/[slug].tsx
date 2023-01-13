import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import blogStyles from './blog.styles';
import { readTime } from "../../lib/utils";
import Tags from "../../components/Tags/tags";

export default function Blog({ frontmatter, content}) {

  return (
    <div className="w-full">
      <div className={blogStyles.articleContainer}>
        <section className="flex flex-col items-center py-10 justify-evenly align-middle">
          <h1 className="text-lg-2xl">{frontmatter.title}</h1>
          <p className="w-3/5 text-base text-stone-500 text-center">{frontmatter.metaDesc}</p>
          <div className="flex w-3/5 justify-around text-stone-500">
            <span>{frontmatter.date}</span>
            <span>{`~${readTime(content)} min read`}</span>
          </div>
        </section>
        <section className="border-t-2 border-t-stone-500 pt-10">
          <ReactMarkdown>{content}</ReactMarkdown>
          <Tags tags={frontmatter.tags}/>
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