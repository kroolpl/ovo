import Google from '@auth/core/providers/google';
import type { AuthConfig } from '@auth/core/types';
import { client } from './sanity';

interface UserData {
  role?: string;
}

interface ExtendedUser {
  email: string;
  name: string | null;
  image: string | null;
  role?: string;
}

interface SessionUser {
  email: string;
  name: string | null;
  image: string | null;
}

interface Session {
  user?: SessionUser;
}

export const authConfig: AuthConfig = {
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Check if user exists in Sanity
        const existingUser = await client.fetch<UserData>(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        );

        if (!existingUser) {
          // Create new user in Sanity
          await client.create({
            _type: 'user',
            email: user.email,
            name: user.name || null,
            image: user.image || null,
            role: 'user',
            provider: account?.provider,
            createdAt: new Date().toISOString(),
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session }) {
      if (session?.user?.email) {
        // Fetch user data from Sanity
        const userData = await client.fetch<UserData>(
          `*[_type == "user" && email == $email][0]`,
          { email: session.user.email }
        );
        
        // Create extended user with role
        const extendedUser: ExtendedUser = {
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
          role: userData?.role || 'user'
        };

        return {
          ...session,
          user: extendedUser
        };
      }
      return session;
    },
  },
  trustHost: true,
  secret: import.meta.env.AUTH_SECRET,
}; 