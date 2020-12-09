import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, StatusBar } from 'react-native';
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import HTMLView from 'react-native-htmlview'
import { LinearGradient } from 'expo-linear-gradient';
import DOMAIN from '../domain'

class DetailEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {event: {image: ""}}
    }
    componentDidMount() {
        fetch(`${DOMAIN.api}/event/${this.props.navigation.state.params.event}`)
            .then(response => response.json())
            .then(data => {                
                this.setState({event: data})
            })
    }
    render() {
        let startDate
        let endDate
        let cover = this.state.event.cover_image?this.state.event.cover_image:this.state.event.image
        if (cover.indexOf('http') == -1) {
            cover = (`${DOMAIN.api}/` + cover).replace('\\', '/')
        }
        if (!this.state.event.date) {
            startDate = new Date(this.state.event.date_start)
            endDate = new Date(this.state.event.date_end)
        }
        else {
            startDate = new Date(this.state.event.date.date_start)
            endDate = new Date(this.state.event.date.date_end)
        }
        const description = this.state.event.discription
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
                    backgroundColor: '#ffffff',
                    fontFamily: 'UTMAvo'
                }}>
                    <View style={{
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').width/16*9,
                        borderRadius: 10,
                    }}>
                        <FontAwesomeIcon color="white" size={30} style={{ marginTop: StatusBar.currentHeight+10, marginLeft: 10, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                        <LinearGradient colors={['transparent', 'white']} style={{ position: 'absolute', marginTop: Dimensions.get('window').width/16*9-200, height: 200, width: Dimensions.get('window').width, zIndex: 3}}></LinearGradient>
                        <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width/16*9, zIndex: 0}} source={{uri: cover}} />
                    </View>
                    <View>
                        <Text style={styles.headText}>{this.state.event.name}</Text>
                        <Text style={{ paddingLeft: 20 }}><Text style={styles.boldText}>Ngày bắt đầu: </Text>{`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</Text>
                        <Text style={{ paddingLeft: 20 }}><Text style={styles.boldText}>Ngày kết thúc: </Text>{`${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.headText}>Nội dung sự kiện</Text>
                        <Text style={{ paddingLeft: 20 }}>
                            <HTMLView value={description} style={{width:Dimensions.get('window').width, paddingRight: 30}} />
                        </Text>
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

export default withNavigation(DetailEvent)