import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      pin: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    pin: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    pin: string | null;
  }
}
