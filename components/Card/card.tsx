import Link from "next/link";
import cardStyles from "./card.styles";
import Tags from "../Tags/tags";

const Card = ({ post }) => {
  const { slug, data: { date, metaDesc, title, tags } } = post;
  return (
    <div className={cardStyles.container}>
      <h1 className={cardStyles.title}>
          {title}
      </h1>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <Link className="text-sky-600" href={`blog/${slug}`}>Read More</Link>
      <Tags tags={tags} />
    </div>
  );
}

export default Card;
