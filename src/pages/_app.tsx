import { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import "../styles/global.scss";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <main className={`${roboto} min-h-min min-w-[1440px] overflow-auto`}>
      <Component {...pageProps} />
    </main>
  );
}
