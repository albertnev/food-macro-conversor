import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <meta content="Macro Conversor" name="application-name" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="Macro Conversor" name="apple-mobile-web-app-title" />
        <meta
          content="Convert your macros from one food to another"
          name="description"
        />
        <meta content="telephone=no" name="format-detection" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="/icons/browserconfig.xml" name="msapplication-config" />
        <meta content="#2B5797" name="msapplication-TileColor" />
        <meta content="no" name="msapplication-tap-highlight" />
        <meta content="#000000" name="theme-color" />

        <link href="/icons/touch-icon-iphone.png" rel="apple-touch-icon" />
        <link
          href="/icons/touch-icon-ipad.png"
          rel="apple-touch-icon"
          sizes="152x152"
        />
        <link
          href="/icons/touch-icon-iphone-retina.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/icons/touch-icon-ipad-retina.png"
          rel="apple-touch-icon"
          sizes="167x167"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/manifest.json" rel="manifest" />
        <link
          color="#5bbad5"
          href="/icons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <link href="/favicon.ico" rel="shortcut icon" />

        <meta content="summary" name="twitter:card" />
        <meta content="Macro Conversor" name="twitter:title" />
        <meta
          content="Convert your macros from one food to another"
          name="twitter:description"
        />
        <meta
          content="https://food-macro-conversor.vercel.app/icons/android-chrome-192x192.png"
          name="twitter:image"
        />
        <meta content="website" property="og:type" />
        <meta content="Macro Conversor" property="og:title" />
        <meta
          content="Convert your macros from one food to another"
          property="og:description"
        />
        <meta content="Macro Conversor" property="og:site_name" />
        <meta
          content="https://food-macro-conversor.vercel.app/icons/apple-touch-icon.png"
          property="og:image"
        />
      </Head>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        hideProgressBar
        position="top-right"
        theme="colored"
      />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
