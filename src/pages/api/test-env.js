// pages/api/test-env.js - NOUVEAU FICHIER
export default function handler(req, res) {
  res.json({
    FLASK_API_URL: process.env.FLASK_API_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET' : 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV,
    all_env_keys: Object.keys(process.env).filter(key => 
      key.includes('FLASK') || 
      key.includes('NEXTAUTH') || 
      key.includes('GOOGLE') || 
      key.includes('FACEBOOK')
    )
  });
}
