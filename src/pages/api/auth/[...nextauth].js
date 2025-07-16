// pages/api/auth/[...nextauth].js - VERSION AVEC LOGS DÉTAILLÉS
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
        console.log('🔍 [NextAuth] === DÉBUT AUTHORIZE ===');
        console.log('🔍 [NextAuth] Credentials:', { email: credentials.email, password: '***' });
        console.log('🔍 [NextAuth] FLASK_API_URL:', process.env.FLASK_API_URL);
        
        try {
          const requestBody = {
            email: credentials.email,
            password: credentials.password
          };
          console.log('🔍 [NextAuth] Request body:', requestBody);
          
          const response = await fetch(`${process.env.FLASK_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

          console.log('📡 [NextAuth] Response status:', response.status);
          console.log('📡 [NextAuth] Response headers:', Object.fromEntries(response.headers.entries()));
          
          const responseText = await response.text();
          console.log('📡 [NextAuth] Response text:', responseText);
          
          let data;
          try {
            data = JSON.parse(responseText);
            console.log('📡 [NextAuth] Parsed data:', data);
          } catch (parseError) {
            console.error('❌ [NextAuth] JSON parse error:', parseError);
            console.log('📡 [NextAuth] Raw response:', responseText);
            return null;
          }

          if (response.ok && data.success) {
            console.log('✅ [NextAuth] Flask response OK');
            console.log('✅ [NextAuth] Token received:', data.token ? 'YES' : 'NO');
            console.log('✅ [NextAuth] Token preview:', data.token ? data.token.substring(0, 30) + '...' : 'NULL');
            
            const userObject = {
              id: data.user.id.toString(),
              email: data.user.email,
              name: `${data.user.firstname || ''} ${data.user.lastname || ''}`.trim(),
              firstname: data.user.firstname,
              lastname: data.user.lastname,
              image: data.user.avatar_url,
              flaskToken: data.token, // ✅ STOCKAGE DU TOKEN
            };
            
            console.log('✅ [NextAuth] User object created:', {
              ...userObject,
              flaskToken: userObject.flaskToken ? 'PRESENT' : 'MISSING'
            });
            
            return userObject;
          } else {
            console.error('❌ [NextAuth] Flask response not OK:', { status: response.status, data });
            return null;
          }
          
        } catch (error) {
          console.error('❌ [NextAuth] Network/other error:', error);
          return null;
        } finally {
          console.log('🔍 [NextAuth] === FIN AUTHORIZE ===');
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔍 [NextAuth] === DÉBUT SIGNIN CALLBACK ===');
      console.log('🔍 [NextAuth] SignIn - Provider:', account.provider);
      console.log('🔍 [NextAuth] SignIn - User:', {
        id: user.id,
        email: user.email,
        hasFlaskToken: !!user.flaskToken
      });
      if (account.provider === 'facebook') {
        console.log('🔍 Facebook login:', {
          user: user.email,
          account: account.provider
        });
        
        // Votre logique existante pour Facebook
        try {
          const response = await fetch(`${process.env.FLASK_API_URL}/auth/oauth-signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'facebook',
              provider_id: account.providerAccountId,
              email: user.email,
              firstname: user.name?.split(' ')[0] || '',
              lastname: user.name?.split(' ').slice(1).join(' ') || '',
              avatar_url: user.image
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            user.flaskToken = data.token;
            return true;
          }
        } catch (error) {
          console.error('❌ Facebook OAuth error:', error);
        }
      }
      // OAuth Google/Facebook
      if (account.provider === 'google' ) {
        console.log('🔍 [NextAuth] Processing OAuth for:', account.provider);
        
        try {
          const requestBody = {
            provider: account.provider,
            provider_id: account.providerAccountId,
            email: user.email,
            firstname: user.name?.split(' ')[0] || '',
            lastname: user.name?.split(' ').slice(1).join(' ') || '',
            avatar_url: user.image
          };
          console.log('🔍 [NextAuth] OAuth request body:', requestBody);
          
          const response = await fetch(`${process.env.FLASK_API_URL}/auth/oauth-signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });

          console.log('📡 [NextAuth] OAuth response status:', response.status);
          
          const data = await response.json();
          console.log('📡 [NextAuth] OAuth response data:', data);

          if (response.ok && data.success && data.token) {
            console.log('✅ [NextAuth] OAuth token received:', data.token.substring(0, 30) + '...');
            
            // ✅ MODIFIER L'OBJET USER DIRECTEMENT
            user.id = data.user.id.toString();
            user.firstname = data.user.firstname;
            user.lastname = data.user.lastname;
            user.flaskToken = data.token;
            
            console.log('✅ [NextAuth] User object updated with Flask token');
          } else {
            console.error('❌ [NextAuth] OAuth Flask failed:', data);
          }
        } catch (error) {
          console.error('❌ [NextAuth] OAuth error:', error);
        }
      }
      
      console.log('🔍 [NextAuth] === FIN SIGNIN CALLBACK ===');
      return true;
    },
    
    async jwt({ token, user, account }) {
      console.log('🔍 [NextAuth] === DÉBUT JWT CALLBACK ===');
      console.log('🔍 [NextAuth] JWT - Has user:', !!user);
      console.log('🔍 [NextAuth] JWT - Current token keys:', Object.keys(token));
      
      if (user) {
        console.log('🔍 [NextAuth] JWT - User has flaskToken:', !!user.flaskToken);
        console.log('🔍 [NextAuth] JWT - Token preview:', user.flaskToken ? user.flaskToken.substring(0, 30) + '...' : 'NONE');
        
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.flaskToken = user.flaskToken; // ✅ STOCKAGE DANS JWT
        
        console.log('✅ [NextAuth] JWT - Token stored in JWT:', !!token.flaskToken);
      }
      
      console.log('🔍 [NextAuth] JWT - Final token keys:', Object.keys(token));
      console.log('🔍 [NextAuth] === FIN JWT CALLBACK ===');
      return token;
    },
    
    async session({ session, token }) {
      console.log('🔍 [NextAuth] === DÉBUT SESSION CALLBACK ===');
      console.log('🔍 [NextAuth] Session - Token keys:', Object.keys(token));
      console.log('🔍 [NextAuth] Session - Has flaskToken in token:', !!token.flaskToken);
      
      session.user.id = token.id;
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
      session.accessToken = token.flaskToken; // ✅ MISE À DISPOSITION
      
      console.log('✅ [NextAuth] Session - accessToken set:', !!session.accessToken);
      console.log('✅ [NextAuth] Session - accessToken preview:', session.accessToken ? session.accessToken.substring(0, 30) + '...' : 'NONE');
      console.log('🔍 [NextAuth] === FIN SESSION CALLBACK ===');
      
      return session;
    }
  },
  session: { 
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 heures
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // ✅ LOGS NEXTAUTH ACTIVÉS
}

export default NextAuth(authOptions)
