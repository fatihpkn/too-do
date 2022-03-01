import "styles/global.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import React from "react";
import { API } from "SupabaseAPI";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { AuthProvider, useAuth } from "context/auth";
import Header from "components/Header";
import { useRouter } from "next/router";
import PrivateLayout from "components/Layout/private";
import PublicLayout from "components/Layout/public";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState<User | null | undefined>(null);

  const [queryClient] = React.useState(() => new QueryClient());

  const router = useRouter();

  const handleAuthChange = async (event: AuthChangeEvent, session: Session | null) => {
    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
      setUser(session?.user);
      return await fetch("/api/auth", { headers: new Headers({ "content-type": "application/json" }), method: "POST", body: JSON.stringify({ event, session }) });
    }

    if (event === "SIGNED_OUT") {
      setUser(null);
      await fetch("/api/logout", { headers: new Headers({ "content-type": "application/json" }), method: "POST", body: JSON.stringify({ event, session }) });
      // router.replace("login");
    }
  };

  React.useEffect(() => {
    const { data: AuthData } = API.auth.onAuthStateChange(async (event, session) => {
      await handleAuthChange(event, session);
      console.log("Event change -> ", event);
      setUser(session?.user);
    });

    return () => {
      AuthData?.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const u = API.auth.user();

    console.log("user", user);

    const _currentUser = user || u || pageProps.context.auth.user;

    if (_currentUser) {
      router.replace("todos");
    }

    // if (pageProps.context.auth || u) {
    // }
  }, [user]);

  const Layout = user || pageProps?.context?.auth ? PrivateLayout : PublicLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider initialValue={user || pageProps?.context?.auth}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
