import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/router";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  skipAuth?: boolean;
};

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
  session: Session | null | undefined;
}

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, session, pageProps } = props;

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? ((page) => page);
  const skipAuth = Component.skipAuth;

  return getLayout(
    <SessionProvider session={session}>
      <Auth skipAuth={skipAuth}>
        <Component {...pageProps} />
      </Auth>
    </SessionProvider>
  );
}

type AuthProps = {
  skipAuth?: boolean;
  children: React.ReactNode;
};

function Auth({ skipAuth, children }: AuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (skipAuth === true) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return <p>Redirecting to login...</p>;
  }

  return <>{children}</>;
}
