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
    <Link href={`blog/${slug}`} className={cardStyles.container}>
      <h1 className={cardStyles.title}>
          {title}
      </h1>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <div className={cardStyles.readMore}>
        <AiFillRead />
        <span>Read More</span>
      </div>
      <Tags tags={tags} />
    </Link>
  );
};

export default Card;
