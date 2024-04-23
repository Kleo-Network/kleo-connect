const config = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET
  },
  calendly: {
    apiKey: import.meta.env.VITE_CALENDLY_INTEGRATION_API_KEY,
    clientSecret: import.meta.env.VITE_CALENDLY_CLIENT_SECRET,
    webhookSigningKey: import.meta.env.VITE_CALENDLY_WEBHOOK_SIGNING_KEY
  },
  instagram: {
    applicationId: import.meta.env.INSTAGRAM_APPLICATION_ID,
    appSecret: import.meta.env.INSTAGRAM_APP_SECRET
  },
  linkedin: {
    applicationId: import.meta.env.VITE_LINKEDIN_APPLICATION_ID,
    applicationSecret: import.meta.env.VITE_LINKEDIN_APPLICATION_SECRET
  },
  twitter: {
    applicationId: import.meta.env.VITE_TWITTER_APPLICATION_ID,
    key: import.meta.env.VITE_TWITTER_KEY,
    secret: import.meta.env.VITE_TWITTER_SECRET,
    clientId: import.meta.env.VITE_TWITTER_CLIENT_ID
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENTID
  },
  googlemap: {
    key: import.meta.env.VITE_GOOGLE_MAP_KEY
  },
  irys: {
    rpcUrl: import.meta.env.VITE_RPC_URL
  },
  connection: {
    redirectionUrl: import.meta.env.VITE_REDIRECTED_URL
  }
}

export default config
