// pages/api/auth/[...nextauth].js - VERSION CORRIGÉE POUR PRODUCTION
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 [NextAuth] Authorize credentials for:', credentials.email);
        console.log('🔍 [NextAuth] FLASK_API_URL:', process.env.FLASK_API_URL);
        
        try {
          const response = await fetch(`${process.env.FLASK_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          });

          console.log('📡 [NextAuth] Flask response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ [NextAuth] Flask login success:', data.success);
            
            if (data.success && data.token) {
              return {
                id: data.user.id.toString(),
                email: data.user.email,
                name: `${data.user.firstname || ''} ${data.user.lastname || ''}`.trim(),
                flaskToken: data.token, // ✅ Token Flask stocké
              };
            }
          }
          
          console.error('❌ [NextAuth] Flask login failed');
          return null;
        } catch (error) {
          console.error('❌ [NextAuth] Login error:', error);
          return null;
        }
      }
    })
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔍 [NextAuth] SignIn callback - Provider:', account?.provider);
      
      // ✅ SIMPLIFICATION : Traiter tous les OAuth ensemble
      if (account && (account.provider === 'google' || account.provider === 'facebook')) {
        console.log('🔍 [NextAuth] Processing OAuth for:', account.provider);
        
        try {
          const flaskApiUrl = process.env.FLASK_API_URL || 'https://wendogo.online';
          console.log('🔍 [NextAuth] Using Flask API:', flaskApiUrl);
          
          const response = await fetch(`${flaskApiUrl}/auth/oauth-signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: account.provider,
              provider_id: account.providerAccountId,
              email: user.email,
              firstname: user.name?.split(' ')[0] || '',
              lastname: user.name?.split(' ').slice(1).join(' ') || '',
              avatar_url: user.image
            })
          });

          console.log('📡 [NextAuth] OAuth response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('✅ [NextAuth] OAuth success:', data.success);
            
            if (data.success && data.token) {
              // ✅ STOCKER LE TOKEN DANS L'OBJET USER
              user.flaskToken = data.token;
              user.id = data.user.id.toString();
              console.log('✅ [NextAuth] Flask token stored in user object');
            }
          } else {
            console.error('❌ [NextAuth] OAuth Flask failed:', response.status);
          }
        } catch (error) {
          console.error('❌ [NextAuth] OAuth error:', error);
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      console.log('🔍 [NextAuth] JWT callback');
      
      // ✅ PREMIÈRE CONNEXION : Stocker le token Flask
      if (user && user.flaskToken) {
        console.log('✅ [NextAuth] Storing Flask token in JWT');
        token.flaskToken = user.flaskToken;
        token.id = user.id;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      console.log('🔍 [NextAuth] Session callback');
      console.log('🔍 [NextAuth] Token has flaskToken:', !!token.flaskToken);
      
      // ✅ TRANSMETTRE LE TOKEN À LA SESSION
      session.accessToken = token.flaskToken;
      session.user.id = token.id;
      
      console.log('✅ [NextAuth] accessToken set in session:', !!session.accessToken);
      
      return session;
    }
  },
  
  session: { 
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 heures
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development', // Logs seulement en dev
}

export default NextAuth(authOptions)
