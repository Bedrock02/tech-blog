import fs from "fs";
import Image from 'next/image';
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown'

export default function Blog({ frontmatter, content}) {

  return (
    <div className="w-100">
      <Image alt='blogpost-image' src={`/${frontmatter.socialImage}`} className="w-1/4 mx-auto" />
      <div className="prose w-3/4  mx-auto">
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

interface GetStaticPropsSlug {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params:{ slug } }: GetStaticPropsSlug){
    const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
}