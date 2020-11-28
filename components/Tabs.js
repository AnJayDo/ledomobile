import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import logo from '../assets/logo.png';

export default function Header() {
    return (
        <View style={styles.header}>
            <Image source={logo} style={{ height: 50, width: 170, resizeMode: 'contain' }} />
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
});