import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'
import logo from '../assets/logo.png';

 class Tabs extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserScreen')} style={styles.header}>
                <Image source={logo} style={{ height: 50, width: 170, resizeMode: 'contain' }} />
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        padding: 10,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
});

export default withNavigation(Tabs)