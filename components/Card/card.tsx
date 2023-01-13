import Link from "next/link";
import cardStyles from "./card.styles";

const Card = ({ post }) => {
  const { slug, data: { date, metaDesc, metaTitle, tags } } = post;
  return (
    <div className={cardStyles.container}>
      <Link href={`blog/${slug}`}>
        <h1 className={cardStyles.title}>
          {metaTitle}
        </h1>
      </Link>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <ul className={cardStyles.tagContainer}>
        {tags.map((tag: string) => (<li className={cardStyles.tag} key={`li-${tag}`}>{tag}</li>))}
      </ul>
    </div>
  );
}

export default Card;
