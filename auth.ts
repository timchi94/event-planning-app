import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "servercookies";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "https://event-planning-app-nu.vercel.app/auth/google/callback",
    },
    async ({ profile }) => {
      const user: User = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      };

      return user;
    }
  )
);
