import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // @ts-ignore This requires some await call that we are bypassing
      async authorize(credentials, req) {
        return {
          id: 1,
          name: "J Smith",
          email: "jsmith@example.com",
          authenticationToken: "kjb34kbj2345kjb4523",
        };
      },
    }),
  ],
  callbacks: {
    // async jwt({ token }) {
    //   token.userRole = "admin";
    //   return token;
    // },
    async session({ session, user, token }: any) {
      // console.log("================== session =====================");
      // console.log("session", session);
      // console.log("sessuser", user);
      // console.log("sesstoken", token);

      // I dont see a session.authenticationToken
      if (session.authenticationToken) {
        session.authenticationToken = token.authenticationToken;
      } else {
        session.token = token;
      }

      return session;
    },
    async jwt({ token, user }: any) {
      // console.log("================== jwt =====================");
      // console.log("jwttoken", token);
      // console.log("jwtuser", user);

      if (user) {
        token.authenticationToken = user.authentication_token;
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", // Error code passed in query string as ?error=
  },
  jwt: {
    secret: "blah",
  },
};

export default NextAuth(authOptions);
