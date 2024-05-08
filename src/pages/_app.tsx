import type { AppProps } from "next/app";
import "../css/globals.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useRouter } from "next/router";
import i18nHelper from "@/i18n";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { locale } = router;
  i18nHelper.locale(locale);
  return <Component {...pageProps} />;
}
