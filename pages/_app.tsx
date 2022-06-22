import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";
import { AuthProvider } from "../lib/client/context/auth";
import Head from "next/head";
import { MantineProvider, useMantineTheme } from "@mantine/core";
function MyApp({ Component, pageProps }) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Sriracha&display=swap');
        </style>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');
        </style>
      </Head>
      <AuthProvider>
        <MantineProvider
          theme={{
            colorScheme: "light",
            fontFamily: "tiro bangla",
        
            headings: { fontFamily: "sriracha", fontWeight: "normal" },
            // black: theme.colors.dark[7],
            // white: theme.colors.gray[2],
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
