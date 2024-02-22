import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/global.scss';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto} size-screen overflow-auto`}>
      <Component {...pageProps} />
    </main>
  );
}
