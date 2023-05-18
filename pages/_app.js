import "../styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "cookie";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
