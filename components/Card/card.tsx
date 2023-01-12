import Link from "next/link";
import cardStyles from "./card.styles";

const Card = ({ post }) => {
  const { slug, data: { date, metaDesc, metaTitle, tags } } = post;
  console.log(post)
  return (
    <div className={cardStyles.container}>
      <Link href={`blog/${slug}`}>
        <h1 className={cardStyles.title}>
          {metaTitle}
        </h1>
      </Link>
      <p className={cardStyles.date}>{date}</p>
      <p className={cardStyles.metaData}>{metaDesc}</p>
      <ul className="list-none flex items-stretch justify-evenly">
        {tags.map((tag: string) => (<li className="bg-slate-500 text-slate-50 rounded-lg px-2" key={`li-${tag}`}>{tag}</li>))}
      </ul>
    </div>
  );
}

export default Card;
