import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faHome, faUser, faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/logo.png';

 class Tabs extends Component {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')} >
                    <FontAwesomeIcon color="#7b7b7b" size={34} icon={faHome} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Events')} >
                    <FontAwesomeIcon color="#7b7b7b" size={34} icon={faCalendarWeek} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UserScreen')} >
                    <FontAwesomeIcon color="#7b7b7b" size={34} icon={faUser} />
                </TouchableOpacity>
                {/* <Image source={logo} style={{ height: 50, width: 170, resizeMode: 'contain' }} /> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        width: Dimensions.get('window').width,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: '#000',
        height: 70,
        padding: 10,
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
    button: {
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
});

export default withNavigation(Tabs)