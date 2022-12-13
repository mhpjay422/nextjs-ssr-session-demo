import { GetServerSidePropsContext, NextPage } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { Session } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { useSession } from 'next-auth/react';

const Hosts: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <div style={{ width: "100%" }}>
      {session && (
        <div
          style={{
            marginLeft: "50%",
            marginRight: "50%",
            marginTop: "50vh",
          }}
        >
          Session!!!
        </div>
      )}
      {!session && <div>Missing a session</div>}
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
                    context.req,
                    context.res,
                    authOptions
                  )

  return {
    props: {
      session
    },
  };
}

export default Hosts;

