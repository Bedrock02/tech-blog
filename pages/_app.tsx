/* eslint-disable @next/next/inline-script-id */
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout/layout';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { GA_TRACKING_ID } from "../lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} /><Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${GA_TRACKING_ID});
            `
          }} />
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </>
  );
}
