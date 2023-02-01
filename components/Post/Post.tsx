import ReactMarkdown from 'react-markdown';
import { readTime } from 'lib/utils';
import postStyles from './post.styles';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';
import rehypeRaw from 'rehype-raw';

interface Props {
    title: string,
    metaDesc: string,
    date: string,
    content: string,
}

const PostHeader = ({title, metaDesc, date, content }: Props) =>
  (
    <section className={postStyles.header}>
      <h1 className="text-lg-2xl">{title}</h1>
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
        <PostHeader {...props} />
        <PostContent content={content} />
      </div>
    </div>
    );
};

export default Post;