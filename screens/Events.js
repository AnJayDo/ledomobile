import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import HTMLView from 'react-native-htmlview'
import { LinearGradient } from 'expo-linear-gradient';
import Event from '../components/Event'
import DOMAIN from '../domain'

class Events extends Component {
    constructor(props) {
        super(props)
        this.state = {events: []}
    }
    componentDidMount() {
        fetch(`${DOMAIN.api}/event/all`)
            .then(response => response.json())
            .then(data => {                
                this.setState({events: data})
            })
    }
    render() {
        let content = this.state.events.map(event => <Event event={event}/>)
        return (
            <View style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: '#ffffff',
                fontFamily: 'UTMAvo'
            }}>
                <ScrollView style={{
                    height: Dimensions.get('window').height - 100,
                    width: Dimensions.get('window').width,
                    backgroundColor: '#f2f2f2',
                    fontFamily: 'UTMAvo'
                }}>
                    <View style={{
                        width: Dimensions.get('window').width,
                        height: 70,
                        borderRadius: 10,
                    }}>
                        <FontAwesomeIcon color="rgb(255,215,70)" size={30} style={{ marginTop: StatusBar.currentHeight+10, marginLeft: 10, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                        <Text color="white" style={{ marginTop: StatusBar.currentHeight+7, marginLeft: 45, zIndex: 2, position: 'absolute', fontFamily: 'UTMAvoBold', fontSize: 23, color: "rgb(255,215,70)"  }}>SỰ KIỆN</Text>
                       
                    </View>
                    <View style={{marginTop: 10}}>
                        {content}
                    </View>
                </ScrollView>
                <Tabs />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold'
    },
    typeText: {
        color: 'gray',
        paddingLeft: 20,
        maxHeight: 20
    },
    headText: {
        fontFamily: 'UTMAvoBold',
        width: Dimensions.get('window').width,
        paddingLeft: 20,
        fontSize: 25,
        lineHeight: 38,
        color: "rgb(255,215,70)"
    },
    buttonMuaVe: {
        backgroundColor: "rgb(255, 215, 70)",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 30,
        paddingVertical: 8,
        borderRadius: 30,
        marginBottom: 20
    },
    textMuaVe: {
        fontFamily: 'UTMAvoBold',
        color: 'white',
        fontSize: 26,
    }
});

export default withNavigation(Events)