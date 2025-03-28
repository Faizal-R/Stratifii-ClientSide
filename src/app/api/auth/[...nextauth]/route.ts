
import apiClient from '@/config/apiClient';

import { AxiosError } from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


// const {setUser}=useAuthStore()
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.name = profile?.name;
        token.email = profile?.email;
        token.image = profile?.image;
        
        try {
          const response = await apiClient.post(`/auth/google`, {
            name: token.name,
            email: token.email,
            avatar: token.image,
          });
           console.log(response.data.data)
        
            token.accessToken = response.data.data.accessToken;
            token.id = response.data.data.user._id;
          
        } catch (error) {
          console.error("Authentication error:", error);
          if (error instanceof AxiosError) {
            console.error("Response data:", error.response?.data);
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
      }
      session.accessToken = token.accessToken; 
      console.log("session",session)
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
