import ReactMarkdown from 'react-markdown';
import { readTime } from 'lib/utils';
import postStyles from './post.styles';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Props {
    title: string,
    metaDesc: string,
    date: string,
    content: string,
}

/**
 * Took code from the following blog
 * https://www.thefullstackblog.com/highlight-code-blocks-in-markdown-files-with-react-markdown-and-react-syntax-highlighter-libraries
 */
const CodeBlock = {
  // @ts-ignore
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

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
  <article className="all-initial">
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