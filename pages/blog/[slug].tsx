import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import { readTime } from "../../lib/utils";
import { AiFillCalendar, AiFillClockCircle } from 'react-icons/ai'

import { generateTailWindStrings } from "../../lib/utils"

const blogStyles = generateTailWindStrings({
    articleContainer: [
        'bg-stone-100',
        'prose',
        'max-w-full',
        'mx-auto',
        'px-6',
    ],
    header: [
        'align-middle',
        'flex',
        'flex-col',
        'items-center',
        'justify-evenly',
        'py-10',
    ],
    metaDesc: [
        'w-3/5',
        'text-center',
        'text-base',
        'text-stone-500',
    ],
    metaData: [
        'flex',
        'justify-around',
        'text-stone-500',
        'w-3/5',
    ],
    metaDataItem: [
        'flex',
        'flex-row',
        'items-center',
        'gap-1',
    ],
    content: [
        'border-t-2',
        'border-t-stone-500',
        'py-20',
    ]

});

// @ts-ignore
export default function Blog({ frontmatter, content}) {

  return (
    <div className="w-full">
      <div className={blogStyles.articleContainer}>
        <section className={blogStyles.header}>
          <h1 className="text-lg-2xl">{frontmatter.title}</h1>
          <p className={blogStyles.metaDesc}>{frontmatter.metaDesc}</p>
          <div className={blogStyles.metaData}>
            <div className={blogStyles.metaDataItem}>
              <AiFillCalendar />
              <span>{frontmatter.date}</span>
            </div>
            <div className={blogStyles.metaDataItem}>
              <AiFillClockCircle />
              <span>{`~${readTime(content)} min read`}</span>
            </div>
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
  
  return {
    paths,
    fallback:false
  }
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