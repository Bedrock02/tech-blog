import Header from "components/Header/header";
import Footer from "components/Footer/footer";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <div className="w-full min-h-screen">
        <Header />
        <div className="container w-5/6 mx-auto mt-16">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
