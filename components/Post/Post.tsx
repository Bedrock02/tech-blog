import ReactMarkdown from 'react-markdown';
import { readTime } from '../../lib/utils';
import postStyles from './post.styles';
import { AiFillClockCircle, AiFillCalendar } from 'react-icons/ai';

interface Props {
    title: string,
    metaDesc: string,
    date: string,
    content: string,
}

const Post = ({ title, metaDesc, date, content }: Props) => {
    return (
      <div className="w-full">
        <div className={postStyles.articleContainer}>
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
          <section className={content}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </section>
        </div>
      </div>
    )
};

export default Post;