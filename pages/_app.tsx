import "../styles/globals.css";
import { AuthProvider } from "../lib/client/context/auth";
import Head from "next/head";
import { MantineProvider, useMantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
function MyApp({ Component, pageProps }) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
        </style>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Arima&display=swap');
        </style>
      </Head>
      <AuthProvider>
        <MantineProvider
          theme={{
            colorScheme: "light",
            fontFamily: "lato , arima",

            headings: { fontFamily: "lato", fontWeight: "normal" },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider position="bottom-right" limit={5}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
