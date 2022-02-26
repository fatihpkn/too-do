import "styles/global.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return <SWRConfig value={{ fallback: pageProps.fallback }}><Component {...pageProps} /></SWRConfig>;
}

export default MyApp;
