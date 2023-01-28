import Card from "components/Card/card";
import fs from 'fs';
import matter from "gray-matter";
import Head from 'next/head';
import { PostMeta } from "types";

interface Post {
  slug: string
  data: PostMeta
}

interface HomeProps {
  posts: Post[]
}

export default function Home(props: HomeProps) {
  const { posts } = props;
  return (
    <>
      <Head>
        <link rel="payload" href="/images/pexels-stephan-seeber-1054218.jpg" as="image"></link>
      </Head>
      <div className="flex flex-row flex-wrap justify-start gap-14">
        {posts.map((post,index)=>(
          <Card key={index} post={post} />
        ))}

      </div>
    </>
  );
}

export async function getStaticProps(){
  // Getting all our posts at build time

  // Get all the posts from posts folder
  const files = fs.readdirSync("posts");
  
  // Loop over each post to extract the frontmatter which we need
  const posts = files.map((file) => {
    // getting the slug here which we will need as a URL query parameter
    const slug = file.replace(".md", "");
    // Reading the contents of the file
    const filecontent = fs.readFileSync(`posts/${file}`, "utf-8");
    const parsedContent = matter(filecontent);
    //The parsed content contains data and content we only need the data which is the frontmatter
    const {data} = parsedContent;
    return {
      slug,
      data,
    };
  });

  posts.sort( (postA, postB) => {
    const { data: { date: dateA } } = postA;
    const { data: { date: dateB } } = postB;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return {
    props: {
      posts
    }
  };
}