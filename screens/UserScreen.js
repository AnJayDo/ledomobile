import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage'
import TomatoesImage from '../assets/RottenTomatoes.png'
import StarImage from '../assets/Star.png'
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import * as EmailValidator from 'email-validator'

class UserScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { email: "", password: "", securePassword: true, displayLogin: true }
    }
    componentDidMount() {
        // fetch(`${DOMAIN.api}/movie/${this.props.navigation.state.params.movie}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         fetch(`${DOMAIN.api}/movietime/${data._id}`)
        //             .then(response => response.json())
        //             .then(res => {
        //                 this.setState({ movie: data, movietimes: res, times: res, chosenDate: res })
        //             })
        //     })
    }
    render() {
        // let content
        // if(this.state.displayLogin) {
        //     content = 
        // } else {
        //     content = 
        // }
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
                        height: 70,
                        borderRadius: 10,
                    }}>
                        <FontAwesomeIcon color="rgb(255, 215, 70)" size={30} style={{ marginTop: StatusBar.currentHeight+10, marginLeft: 10, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                    </View>
                    <View>
                        <Text style={styles.headText}>ĐĂNG NHẬP</Text>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Email: </Text>
                        <View style={{flexDirection: 'row'}}>
                            <FontAwesome name="user-o" color="#05375a" size={20} />
                            <TextInput placeholder="Email của bạn" onChangeText={(value) => this.setState({email: value})}/>
                            {EmailValidator.validate(this.state.email)?<Feather name="check-circle" color="green" size={20} />:null}
                        </View>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Mật khẩu: </Text>
                        <View>
                            <FontAwesome name="lock" color="#05375a" size={20} />
                            <TextInput secureTextEntry={this.state.securePassword} onChangeText={(value) => this.setState({password: value})} />
                            <Feather name="eye-off" color="grey" size={20} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 12
                        }}>
                            <TouchableOpacity style={styles.button} onPress={this.onClickMuaVe}>
                                <Text style={styles.textMuaVe}>Đăng Ký</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.onClickMuaVe}>
                                <Text style={styles.textMuaVe}>Đăng Nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Tabs />
            </View>
        );
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
        fontSize: 35,
        lineHeight: 45,
        color: "rgb(255,215,70)",
        textAlign: 'center'
    },
    button: {
        backgroundColor: "rgb(255, 215, 70)",
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 14,
        paddingVertical: 8,
        marginHorizontal: 10,
        borderRadius: 30,
        marginBottom: 20
    },
    textMuaVe: {
        fontFamily: 'UTMAvoBold',
        color: 'white',
        fontSize: 26,
    }
});

export default withNavigation(UserScreen)