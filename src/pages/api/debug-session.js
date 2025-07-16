import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    
    // Informations détaillées sur la session
    res.json({
      session_exists: !!session,
      session_keys: session ? Object.keys(session) : [],
      user_keys: session?.user ? Object.keys(session.user) : [],
      has_accessToken: !!session?.accessToken,
      accessToken_preview: session?.accessToken ? session.accessToken.substring(0, 30) + '...' : null,
      full_session: session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
