import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import * as WebBrowser from 'expo-web-browser';

const { ipcRenderer } = window.require("electron");

WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    const auth = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Info</Text>

            <Text>username:bob</Text>
            <Text>password:bob</Text>

            <View style={styles.btnGroup}>
                <Button title="Log In" onPress={() => auth.login()} />
            </View>
            <View style={styles.btnGroup}>
                <Button title="Log Out" onPress={() => auth.logout()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24
    },
    btnGroup: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,
        width: '100%'
    },
    user: {
        fontWeight: 'bold',
        marginTop: 13,
        textTransform: 'uppercase'
    }
});
