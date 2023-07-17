import NextAuth, {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import axios from 'axios';
import Credentials from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "E-Mail", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials: Record<"username" | "password", string> | undefined) => {
        try {
          console.log('credentials', credentials)
          const user = await axios.post('http://localhost:4000/auth/login', credentials);

          if (user) {
            return Promise.resolve(user.data);
          } else {
            return Promise.resolve(null);
          }
        } catch(err) {
          return Promise.resolve(null);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
