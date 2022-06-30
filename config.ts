const config = {
    secureKeys: {
        accessToken: 'accesstoken',
        userInfo: 'userinfo'
    },
    identityServerUrl: 'https://demo.duendesoftware.com',
    identityServerOptions: {
        clientId: 'interactive.public.short',
        scopes: ['openid', 'profile', 'email', 'api', 'offline_access']
    }
}

export default config;