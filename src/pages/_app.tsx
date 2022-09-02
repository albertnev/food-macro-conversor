import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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
