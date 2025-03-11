import apiClient from '@/config/apiClient';
import { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
        token.name = profile?.name;
        token.email = profile?.email;
        token.image = profile?.image;

        try {
          const response = await apiClient.post(`http://localhost:8000/api/v1/auth/google`, {
            name: token.name,
            email: token.email,
            avatar: token.image,
          });
          console.log("Response from backend:", response.data);
        } catch (error) {
      
          if(error instanceof AxiosError){
            console.log(error.response?.data) 
          }
        }
           
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
