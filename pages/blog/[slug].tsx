import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown'
export default function Blog({ frontmatter, content}) {

  return (
    <div className="w-full">
      <div className="prose max-w-full mx-auto bg-stone-200 px-6 rounded-md">
        <h1 className="text-sm">{frontmatter.title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
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