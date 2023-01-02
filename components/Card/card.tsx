import Link from "next/link";

function Blogcard() {
  return (
    <div className="container w-100 mx-auto mb-16">
      <img
        className="w-3/4 rounded-lg mx-auto drop-shadow-lg"
        src="https://images.pexels.com/photos/675764/pexels-photo-675764.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
      />
      <Link href={'/'}>
        <h1 className="text-4xl font-semibold mt-4">
          Here is my first blog of the website
        </h1>
      </Link>
      <p className="text-gray-600 text-sm">2 Feb 2022</p>
      <p>
        This is just a static blog written to test the component structure.This
        is just a static blog written to test the component structure. is just a
        static blog written to test the component structure.
      </p>
    </div>
  );
}

export default Blogcard;
