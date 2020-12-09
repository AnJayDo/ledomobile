import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import HTMLView from 'react-native-htmlview'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DOMAIN from '../domain'

class Event extends Component {
    constructor(props) {
        super(props)
        this.state = {event: {}}
    }
    componentDidMount() {
        fetch(`${DOMAIN.api}/event/${this.props.event.slug}`)
            .then(response => response.json())
            .then(data => {                
                this.setState({event: data})
            })
    }
    render() {
        let image = this.state.event.image?this.state.event.image:""
        if (image.indexOf('http') == -1) {
            image = (`${DOMAIN.api}/` + image).replace('\\', '/')
        }
        const description = this.state.event.discription
        return (
            <TouchableOpacity style={{
                width: Dimensions.get('window').width-40,
                backgroundColor: '#ffffff',
                fontFamily: 'UTMAvo',
                marginLeft: 20,
                marginVertical: 4,
                flexDirection: 'row',
                paddingVertical: 5,
                paddingLeft: 5,
                paddingRight: 20,
                borderRadius: 10,
            }} onPress={() => this.props.navigation.navigate('DetailEvent',{event:this.state.event.slug}) }>
                <Image style={{height: 200, width: 150, borderRadius: 7}} source={{uri: image}}/>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontFamily: 'UTMAvoBold', fontSize: 20}}>{this.state.event.name}</Text>
                    <HTMLView value={description} style={{ fontSize: 20, maxHeight: 140, fontWeight: 'normal', paddingRight: 20, overflow: 'hidden' }} />
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNavigation(Event)