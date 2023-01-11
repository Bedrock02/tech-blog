import Link from "next/link";
import Image from "next/image";
import { PageData } from '../../types'

interface CardProps {
  post: PageData
}

const Card = ({ post }: CardProps) => {
  const { data: { socialImage, metaDesc, date, metaTitle }} = post;
  const { slug } = post;
  return (
    <div className="container w-100 mx-auto mb-16">
      <Image
        alt="blog-image"
        className="w-3/4 rounded-lg mx-auto drop-shadow-lg"
        src={socialImage} />
      
      <Link href={`blog/${slug}`}>
        <h1 className="text-4xl font-semibold mt-4">
          {metaTitle}
        </h1>
      </Link>
      
      <p className="text-gray-600 text-sm">{date}</p>
      <p>{metaDesc}</p>
    </div>
  );
}

export default Card;
