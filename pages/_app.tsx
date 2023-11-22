import { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import instance from "@/utils/axios";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
        fetcher: (url: string) =>
          instance.get(url).then((res) => {
            return res;
          })
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>


  );
};

export default App;
