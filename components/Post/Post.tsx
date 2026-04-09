import ReactMarkdown from 'react-markdown';
import { readTime } from 'lib/utils';
import postStyles from './post.styles';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import rehypeRaw from 'rehype-raw';
import CodeBlock from 'components/CodeBlock/codeBlock';
import Link from 'next/link';

interface Props {
    title: string,
    metaDesc: string,
    date: string,
    content: string,
}

const PostHeader = ({title, metaDesc, date, content }: Props) =>
  (
    <section className={postStyles.header}>
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">{title}</h1>
      <p className={postStyles.metaDesc}>{metaDesc}</p>
      <div className={postStyles.metaData}>
      <div className={postStyles.metaDataItem}>
          <AiFillCalendar />
          <span>{date}</span>
      </div>
      <div className={postStyles.metaDataItem}>
          <AiFillClockCircle />
          <span>{`~${readTime(content)} min read`}</span>
      </div>
      </div>
    </section>
  );

interface PostContentProps {
  content: string
}

const PostContent = ({ content }: PostContentProps) => (
  <article>
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      //@ts-ignore
      components={CodeBlock}
    >
      {content}
    </ReactMarkdown>
  </article>
);


const Post = (props: Props) => {
  const { content } = props;
  return (
    <div className="w-full">
      <div className={postStyles.articleContainer}>
        <Link href="/" className="flex items-center gap-1 text-sm text-violet-700 hover:text-violet-900 font-medium not-prose pt-10">
          <AiOutlineArrowLeft />
          Back to posts
        </Link>
        <PostHeader {...props} />
        <PostContent content={content} />
      </div>
    </div>
    );
};

export default Post;