import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const auth = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text>username:bob</Text>
            <Text>password:bob</Text>
            
            <View style={styles.btnGroup}>
                <Button title="Log In" onPress={() => auth.login()} /> 
            </View>
            <View style={styles.btnGroup}>
                <Button title="Log Out" onPress={() => auth.logout()} />
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
        backgroundColor: 'red',
        flexDirection: 'row',
        marginTop: 10,
        width: '100%'
    },
    user: {
        fontWeight: 'bold',
        marginTop: 13,
        textTransform: 'uppercase'
    }
});
