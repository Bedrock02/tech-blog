
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen ">
      <div className="flex flex-row h-16 justify-around align-middle">
        <h1 className="my-auto text-2xl font-mono">Simple Blog</h1>
        <Link href={`/`} className="my-auto">
          Github Code
        </Link>
      </div>
      <div className="container w-5/6 mx-auto mt-16">
        {children}
      </div>
    </div>
  );
}

export default Layout;
