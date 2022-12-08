import { GetServerSidePropsContext, NextPage } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { Session } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const Hosts: NextPage<{ session: Session }> = ({ session }) => {

  return (
    <div style={{width: "100%"}}>
      { session && 
        <div
          style={{
            marginLeft: "50%", 
            marginRight: "50%", 
            marginTop: "50vh",
            }}>
          Session!!!
        </div>
      }
      { !session && 
        <div>
          Missing a session
        </div>
      }
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const sessionToken = JSON.parse(
    JSON.stringify(
      await unstable_getServerSession(context.req, context.res, authOptions)
    )
  );

  console.log("sessionToken", sessionToken);
  

  return {
    props: {
      session: sessionToken,
    },
  };
}

export default Hosts;

