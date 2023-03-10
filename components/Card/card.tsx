import Link from "next/link";
import cardStyles from "./card.styles";
import Tags from "components/Tags/tags";
import { AiFillRead } from "react-icons/ai";
import { Post } from 'types';

interface CardProps {
  post: Post
}

const Card = ({ post }: CardProps) => {
  const { slug, data: { date, metaDesc, title, tags } } = post;
  return (
    <div className={cardStyles.container}>
      <h1 className={cardStyles.title}>
          {title}
      </h1>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <Link className="text-sky-600" href={`blog/${slug}`}>
        <div className={cardStyles.readMore}>
          <AiFillRead />
          <span>Read More</span>
        </div>
      </Link>
      <Tags tags={tags} />
    </div>
  );
};

export default Card;
