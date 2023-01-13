
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen ">
      <div className="flex flex-row h-16 justify-around align-middle">
        <Link className="my-auto text-2xl font-mono" href={'/'}>
          <h1>Tech Notes</h1>
        </Link>
        <a href={`https://wepadev.com`} target="_blank" className="my-auto text-2xl font-mono" rel="noreferrer">
          <h1>WepaDev</h1>
        </a>
      </div>
      <div className="container w-5/6 mx-auto mt-16">
        {children}
      </div>
    </div>
  );
}

export default Layout;
