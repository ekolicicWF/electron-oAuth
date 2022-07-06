import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from "react-native";
import useAuth from "../hooks/useAuth";
import * as WebBrowser from 'expo-web-browser';

// import {El} from 'electron';
// const electron = window.require('electron');
// const { ipcRenderer } = require('electron').ipcRenderer;
const { ipcRenderer } = window.require("electron");

// WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    const auth = useAuth();

    // function ipcRendere() {
    //     // const [ipcRenderer]=window
    //     // window.Electron.ipcRenderer.send('ipc-example', ['ping']);
    //     electron.notificationApi.sendNotification('My custom message!');
    // }

    function notify() {
        const sampleData = {
            id: '7697726b-4b20-4300-8b04-19474893e0ae',
            body: 'Hello from Login.tsx file'
        }

        const ipc = ipcRenderer.send('gm-notification', sampleData);
    }

    async function runCommand() {
        // How to send events from react native to electron
        // https://stackoverflow.com/questions/59681069/how-to-communicate-between-react-and-electron
        const res = await ipcRenderer.sendSync('authEvent', 'https://www.bbc.co.uk/');
        return res;
    }


    // this.electronService.ipcRenderer.on(
    //     'authEvent',
    //     (event: any, data: any) => this.authBaseService.checkAuth(data));
    //   );

    // useEffect(() => {
    //     console.log('is electron')
    //     // listen for the event
    //     const { ipcRenderer } = window.require('electron');
    //     ipcRenderer.on('authEvent', (event: any, arg: any) => {
    //         console.log('login.tsx==>', event, arg)
    //         auth.elogin(arg);
    //     });

    // }, []);

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
            <View style={styles.btnGroup}>
                <Button title="IPCRendere" onPress={notify} />
            </View>

            {/* <View style={styles.btnGroup}>
                <Button title="Test" onPress={() => auth.teste()} /> 
            </View>
            <View>
                <Text style={styles.user}>User: {auth.userInfo?.name}</Text>
            </View> */}
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
