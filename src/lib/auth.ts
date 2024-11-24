import Google from '@auth/core/providers/google';
import type { AuthConfig } from '@auth/core/types';
import { client } from './sanity';

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
        const existingUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        );

        if (!existingUser) {
          // Create new user in Sanity
          await client.create({
            _type: 'user',
            email: user.email,
            name: user.name,
            image: user.image,
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
        const userData = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: session.user.email }
        );
        
        // Add role to session
        session.user.role = userData?.role || 'user';
      }
      return session;
    },
  },
  trustHost: true,
  secret: import.meta.env.AUTH_SECRET,
}; 