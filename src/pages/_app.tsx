import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/global.scss';
import { ConfigProvider } from 'antd';
import { appWithTranslation } from 'next-i18next';
import { NextPage } from 'next';
import { PagesProgressBar } from 'next-nprogress-bar';
import Head from 'next/head';

import { configToken } from '@/configs/antd';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ConfigProvider theme={configToken}>
      <Head>
        <title>NCT Monitoring</title>
        <link rel="icon" type="image/x-icon" href="/logo.ico" />
      </Head>
      <PagesProgressBar height="4px" color="#004082" options={{ showSpinner: false }} shallowRouting />
      <main className={`${roboto}`}>
        <Component {...pageProps} />
      </main>
    </ConfigProvider>
  );
};

export default appWithTranslation(App);
