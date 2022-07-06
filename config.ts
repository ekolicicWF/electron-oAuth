const config = {
    secureKeys: {
        accessToken: 'accesstoken',
        userInfo: 'userinfo'
    },
    identityServerUrl: 'https://demo.duendesoftware.com',
    identityServerOptions: {
        clientId: 'interactive.public.short',
        silentRenew: true,
        responseType: 'code',
        redirectUrl: `https://localhost/callback`,
        postLogoutRedirectUri: `https://localhost/callback`,
        scopes: ['openid', 'profile', 'email', 'api', 'offline_access'],
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
    }
}

export default config;