
import Link from "next/link";
import Header from "../Header/header";

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      <div className="container w-5/6 mx-auto mt-16">
        {children}
      </div>
    </div>
  );
}

export default Layout;
