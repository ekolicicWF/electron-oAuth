import React, { useEffect } from "react";
import { useState } from "react";
import { Platform } from 'react-native';
import AuthContext from "./AuthContext";
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import config from "../../config";
import useSecureStore from "../hooks/useSecureStore";
import usePersistentState from "../hooks/usePersistentState";

const useProxy = Platform.OS !== 'web';
const redirectUri = AuthSession.makeRedirectUri({ useProxy: useProxy });
const openIdOptions = { ...config.identityServerOptions, redirectUri };

WebBrowser.maybeCompleteAuthSession();

export default function AuthProvider(props: any) {
    const [token, setToken, clearToken] = useSecureStore<AuthSession.TokenResponse | undefined>(config.secureKeys.accessToken);
    const [userInfo, setUserInfo, clearUserInfo] = usePersistentState<Record<string, any> | undefined>(config.secureKeys.userInfo);
    const discovery = AuthSession.useAutoDiscovery(config.identityServerUrl);

    const [request, result, promptAsync] = AuthSession.useAuthRequest(openIdOptions, discovery);

    const _handleCodeExchange = (arg: AuthSession.AuthSessionResult) => {
        if (arg.type === 'success') {
            //console.log('>>>> promptAsync success ', arg);
            const code = arg.params.code;
            const param = {
                code,
                ...openIdOptions,
                extraParams: {
                    code_verifier: request?.codeVerifier || "",
                }
            }

            if (discovery) {
                AuthSession.exchangeCodeAsync(param, discovery)
                    .then(r2 => {
                        //console.log('>>>> exchange Success', r2);
                        setToken(r2);
                        _loadUserInfo(r2.accessToken);
                    })
                    .catch(e2 => console.log('>>>> exchange Error', e2));
            }
        } else {
            console.log('>>>> _handleCodeExchange Error - arg is not success', arg);
        }
    }

    const _loadUserInfo = (_t?: string) => {
        if (discovery) {
            AuthSession.fetchUserInfoAsync({ accessToken: _t || token?.accessToken || '' }, discovery)
                .then(u => {
                    console.log('>>>> _loadUserInfo', u);
                    setUserInfo(u);
                })
                .catch(e => console.log('>>>> _loadUserInfo Error', e))
        } else {
            console.log('>>>> _loadUserInfo error - token or discovery are null');
        }
    }

    const login = () => {
        if (discovery) {
            promptAsync({ useProxy: useProxy })
                .then(_handleCodeExchange)
                .catch(e => console.log('>>>> promptAsync Error: ', e))
        } else {
            console.log('>>>> login error - discovery is null');
        }
    }

    const logout = () => {
        console.log('=> logout', result, request)

        if (discovery && token) {
            const url = `${discovery.endSessionEndpoint}?id_token_hint=${token.accessToken}`;
            clearUserInfo();
            clearToken();
            request?.promptAsync(discovery, { url });
        } else {
            console.log('>>>> logout error - discovery or token are null');
        }
    }

    return (
        <AuthContext.Provider value={{ token, userInfo, login, logout, teste: _loadUserInfo }}>
            {props.children}
        </AuthContext.Provider>
    );
}