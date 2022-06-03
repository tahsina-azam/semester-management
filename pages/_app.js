import { UserProvider } from "@auth0/nextjs-auth0";
import "../styles/globals.css";
import Head from "next/head";
import { MantineProvider,useMantineTheme } from "@mantine/core";
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
      <UserProvider>
      <MantineProvider
        theme={{
          colorScheme: "light",
          fontFamily: "tiro bangla",
          headings: {fontFamily : "sriracha"},
          black:theme.colors.dark[7],
          white:theme.colors.gray[2]
          

        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </UserProvider>
    </>
    
  );
}

export default MyApp;
