import Link from "next/link";

const Card = ({ post }) => {
  console.log(post)
  return (
    <div className="container w-100 mx-auto mb-16">
      <img
        className="w-3/4 rounded-lg mx-auto drop-shadow-lg"
        src={post.data.socialImage} />
      <Link href={`blog/${post.slug}`}>
        <h1 className="text-4xl font-semibold mt-4">
          {post.data.metaTitle}
        </h1>
      </Link>
      <p className="text-gray-600 text-sm">{post.data.date}</p>
      <p>{post.data.metaDesc}</p>
    </div>
  );
}

export default Card;
