import Link from "next/link";
import cardStyles from "./card.styles";

const Card = ({ post }) => {
  const { slug, data: { date, metaDesc, metaTitle, tags } } = post;
  return (
    <div className={cardStyles.container}>
      <h1 className={cardStyles.title}>
          {metaTitle}
      </h1>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <Link className="text-sky-600" href={`blog/${slug}`}>Read More</Link>
      <ul className={cardStyles.tagContainer}>
        {tags.map((tag: string) => (<li className={cardStyles.tag} key={`li-${tag}`}>{tag}</li>))}
      </ul>
    </div>
  );
}

export default Card;
