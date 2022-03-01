import Button from "components/Button";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { API } from "SupabaseAPI";

interface LogoutProps {}

const Logout: NextPage<LogoutProps> = (props) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleSignOut = async () => {
      const session = API.auth.session();
      if (session?.access_token) {
        await API.auth.api.signOut(session?.access_token);
      }
      API.auth.signOut();
      router.replace("/login");
    };

    handleSignOut();
  }, []);

  return (
    <div className='container max-w-7xl w-10/12 mx-auto'>
      <div className='flex h-screen justify-center items-center'>
        <div className='max-w-xs w-full'>
          <div className='flex flex-col gap-3'>Logout..</div>
        </div>
      </div>
    </div>
  );
};

export default Logout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const _se = API.auth.session();

  const session = await API.auth.api.getUserByCookie(req);

  console.log("SESSS", session);
  console.log("_se", _se);

  if (session.token) {
    await API.auth.api.deleteAuthCookie(req, res, { redirectTo: undefined });
    await API.auth.signOut();
    try {
      await API.auth.api.signOut(session.token);
      console.log("then", API.auth.session());
    } catch (error) {
      console.log("Error on sign out", error);
    }
  }

  if (!session.token) {
    return { props: { context: { auth: { user: null } } } };
  }

  return {
    props: {},
  };
};
