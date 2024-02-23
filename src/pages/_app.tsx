import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/global.scss';
import { ConfigProvider } from 'antd';

import { configToken } from '@/configs/antd';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={configToken}>
      <main className={`${roboto}`}>
        <Component {...pageProps} />
      </main>
    </ConfigProvider>
  );
}
