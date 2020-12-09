import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import DOMAIN from '../domain'
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { withNavigation } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler'
import * as EmailValidator from 'email-validator'

const storeData = async (value) => {
    try {
        await AsyncStorage.setItem('jwt', value)
        return (value)
    } catch (e) {

    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('jwt')
        if (value !== null) {
            return (value)
        }
        return ("none")
    } catch (e) {
        // error reading value
    }
}

class UserScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { name: "", email: "", password: "", repassword: "", securePassword: true, secureRepassword: true, displayLogin: true, token: "", user: {}, image: "http://35.193.164.249/src/resoures/defaulavartar.jpg", logined: false }
        this.postLogin = this.postLogin.bind(this)
    }
    componentDidMount() {
        getData().then(data => {
            if (data == "none" || !data) {
                this.setState({ token: "", logined: false })
            }
            else {
                fetch(`${DOMAIN.api}/account/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': data
                    }
                }).then(res => res.json()).then(res => {
                    let image = res.avartar
                    if (String(image).indexOf("http") < 0) image = DOMAIN.api + "/" + image
                    this.setState({ user: res, image: image, token: data, logined: true })
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
    postLogin = async () => {
        if (this.state.email == "" || this.state.password == "") {
            Alert.alert("Nhập thiếu thông tin", "Bạn vẫn chưa nhập đầy đủ thông tin đăng nhập. Làm ơn nhập đủ.",
                [
                    {
                        text: "OK",
                        style: "cancel"
                    },
                ],
                { cancelable: true })
        }
        else {
            fetch(`${DOMAIN.api}/account/login`, {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
                .then(res => res.json()).then(data => {
                    if (data.message == "login succes") {
                        storeData(data.token).then(res => {
                            console.log(res)
                            this.setState({token: res, logined: true})
                        })
                        fetch(`${DOMAIN.api}/account/me`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': data.token
                            }
                        }).then(res => res.json()).then(res => {
                            let image = res.avartar
                            if (String(image).indexOf("http") < 0) image = DOMAIN.api + "/" + image
                            this.setState({ user: res, image: image, token: data, logined: true })
                        })
                        if (this.props.navigation.state.params) {
                            const body = { numberticket: this.props.navigation.state.params.seats.length, seat: JSON.stringify(this.props.navigation.state.params.seats) }
                            fetch(`${DOMAIN.api}/ticket/${this.props.navigation.state.params.movietime}/create`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': data.token
                                },
                                body: JSON.stringify(body)
                            }).then(res => res.json()).then(data => {
                                if (data._id) {
                                    this.props.navigation.navigate('PaymentScreen', {seats: this.props.navigation.state.params.seats, 
                                        ticketID:data._id, 
                                        movie: this.props.navigation.state.params.movie, 
                                        price: this.props.navigation.state.params.price
                                    })
                                }
                            }).catch(e => console.log(e))

                        }
                    } else Alert.alert("Thông báo", data.message,
                        [
                            {
                                text: "OK",
                                style: "cancel"
                            },
                        ],
                        { cancelable: true })
                }).catch(e => console.log(e))
        }
    }
    render() {
        let content
        if (this.state.logined) {
            content = <View style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center'
            }}>
                <Image style={{height: 200, width: 200, borderRadius: 100}} source={{uri: this.state.image}}/>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <TouchableOpacity><Text style={{ fontFamily: "UTMAvo", fontSize: 20, color: 'black', textDecorationLine: 'underline'}}>Thay ảnh đại diện</Text></TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <TouchableOpacity onPress={() => storeData("none").then(() => this.setState({ name: "", email: "", password: "", repassword: "", securePassword: true, secureRepassword: true, displayLogin: true, token: "", user: {}, image: "http://35.193.164.249/src/resoures/defaulavartar.jpg", logined: false }))}>
                        <Text style={{ fontFamily: "UTMAvo", fontSize: 20, color: 'grey', textDecorationLine: 'underline'}}>Đăng xuât</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: "center", marginTop: 10}}>
                    <Text style={{ fontFamily: "UTMAvoBold", width: 100, fontSize: 20}}>Họ tên:</Text>
                    <Text style={{ fontFamily: "UTMAvo", width: 300, fontSize: 20}}>{this.state.user.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Text style={{ fontFamily: "UTMAvoBold", width: 100, fontSize: 20}}>Email:</Text>
                    <Text style={{ fontFamily: "UTMAvo", width: 300, fontSize: 20}}>{this.state.user.email}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Text style={{ fontFamily: "UTMAvoBold", width: 100, fontSize: 20}}>Point:</Text>
                    <Text style={{ fontFamily: "UTMAvo", width: 300, fontSize: 20}}>{this.state.user.point}</Text>
                </View>
            </View>
        }
        else if (this.state.displayLogin) {
            content = <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ffffff',
            }}>
                <Text style={styles.headText}>ĐĂNG NHẬP</Text>
                <Text style={styles.label}>Email: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} placeholder="Email của bạn" onChangeText={(value) => this.setState({ email: value })} />
                    {EmailValidator.validate(this.state.email) ? <Feather name="check-circle" color="green" size={20} /> : null}
                </View>
                <Text style={styles.label}>Mật khẩu: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" color="#05375a" size={20} style={{ marginRight: 15 }} />
                    <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={this.state.securePassword} onChangeText={(value) => this.setState({ password: value })} />
                    {this.state.securePassword ?
                        <TouchableOpacity onPress={() => this.setState({ securePassword: false })}><Feather name="eye-off" color="grey" size={20} /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.setState({ securePassword: true })}><Feather name="eye" color="grey" size={20} /></TouchableOpacity>
                    }
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12
                }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ displayLogin: false })}>
                        <Text style={styles.textMuaVe}>Đăng Ký</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.postLogin}>
                        <Text style={styles.textMuaVe}>Đăng Nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        } else {
            content = <View style={{
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#ffffff',
            }}>
                <Text style={styles.headText}>ĐĂNG KÝ</Text>
                <Text style={styles.label}>Họ tên: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} placeholder="Nhập tên của bạn" onChangeText={(value) => this.setState({ name: value })} />
                    {EmailValidator.validate(this.state.email) ? <Feather name="check-circle" color="green" size={20} /> : null}
                </View>
                <Text style={styles.label}>Email: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user-o" color="#05375a" size={20} style={{ marginRight: 10 }} />
                    <TextInput style={styles.input} placeholder="Email của bạn" onChangeText={(value) => this.setState({ email: value })} />
                    {EmailValidator.validate(this.state.email) ? <Feather name="check-circle" color="green" size={20} /> : null}
                </View>
                <Text style={styles.label}>Mật khẩu: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" color="#05375a" size={20} style={{ marginRight: 15 }} />
                    <TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry={this.state.securePassword} onChangeText={(value) => this.setState({ password: value })} />
                    {this.state.securePassword ?
                        <TouchableOpacity onPress={() => this.setState({ securePassword: false })}><Feather name="eye-off" color="grey" size={20} /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.setState({ securePassword: true })}><Feather name="eye" color="grey" size={20} /></TouchableOpacity>
                    }
                </View>
                <Text style={styles.label}>Nhập lại mật khẩu: </Text>
                <View style={styles.inputContainer}>
                    <FontAwesome name="lock" color="#05375a" size={20} style={{ marginRight: 15 }} />
                    <TextInput style={styles.input} placeholder="Mật khẩu lặp lại" secureTextEntry={this.state.secureRepassword} onChangeText={(value) => this.setState({ repassword: value })} />
                    {this.state.securePassword ?
                        <TouchableOpacity onPress={() => this.setState({ secureRepassword: false })}><Feather name="eye-off" color="grey" size={20} /></TouchableOpacity> :
                        <TouchableOpacity onPress={() => this.setState({ secureRepassword: true })}><Feather name="eye" color="grey" size={20} /></TouchableOpacity>
                    }
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 12
                }}>
                    <TouchableOpacity style={styles.button} onPress={() => this.setState({ displayLogin: true })}>
                        <Text style={styles.textMuaVe}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.onClickMuaVe}>
                        <Text style={styles.textMuaVe}>Đăng Ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        return (
            <View style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: '#ffffff',
                fontFamily: 'UTMAvo'
            }}>
                <View style={{
                    height: Dimensions.get('window').height - 70,
                    width: Dimensions.get('window').width,
                    fontFamily: 'UTMAvo'
                }}>
                    <View style={{
                        width: Dimensions.get('window').width,
                        height: 70,
                        borderRadius: 10,
                    }}>
                        <FontAwesomeIcon color="rgb(255, 215, 70)" size={30} style={{ marginTop: StatusBar.currentHeight + 10, marginLeft: 10, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                    </View>
                    {content}
                </View>
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
    },
    inputContainer: {
        flexDirection: 'row',
        marginHorizontal: Dimensions.get('window').width * 0.2,
        marginTop: 2,
        marginBottom: 10
    },
    label: { fontWeight: 'bold', marginHorizontal: Dimensions.get('window').width * 0.2, fontSize: 20 },
    input: { width: Dimensions.get('window').width * 0.60, fontSize: 20 }
});

export default withNavigation(UserScreen)