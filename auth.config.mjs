import Google from '@auth/core/providers/google'
import Facebook from '@auth/core/providers/facebook'
import { defineConfig } from 'auth-astro'
import { client } from './src/lib/sanity'
import NodeAdapter from "@auth/core/adapters/node"

export default defineConfig({
  adapter: NodeAdapter(),
  providers: [
    Google.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook.default({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      try {
        // Check if user exists in Sanity
        const existingUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: user.email }
        )

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
          })
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
    async session({ session }) {
      if (session?.user?.email) {
        // Fetch user data from Sanity
        const userData = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: session.user.email }
        )
        
        // Add role to session
        session.user.role = userData?.role || 'user'
      }
      return session
    },
  }
}) 