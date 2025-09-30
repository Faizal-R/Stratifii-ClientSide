// src/types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    error?:string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isVerified?:boolean;
    }
  }
}

declare module "next-auth/jwt" {
  /** Extend the JWT interface */
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    isVerified?:boolean;
    error?:string
  }
}