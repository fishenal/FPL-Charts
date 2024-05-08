import type { AppProps } from "next/app";
import "../css/globals.css";
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
