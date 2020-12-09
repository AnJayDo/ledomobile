import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'

class PaymentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { movie: this.props.navigation.state.params.movie, ticketID: this.props.navigation.state.params.ticketID, chosenSeats: this.props.navigation.state.params.seats, price: this.props.navigation.state.params.price }
        this.onClickThanhToan = this.onClickThanhToan.bind(this)
    }
    componentDidMount() {
    }

    onClickThanhToan(key) {
        // if(key=="momo") {
        //     this.props.navigation.navigate('MomoPayment', {ticketID: this.state.ticketID})
        // }
        Alert.alert("Thông báo", "Hệ thống thanh toán đang trong quá trình bảo trì.",[
            {
                text: "OK",
                style: "cancel"
            },
        ],
        { cancelable: true })
    }

    render() {
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
                        <FontAwesomeIcon color="rgb(255,215,70)" size={30} style={{ marginTop: StatusBar.currentHeight+10, marginLeft: 20, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                        <Text style={[styles.headText,{marginTop: StatusBar.currentHeight+2, marginLeft: 40, zIndex: 2, position: 'absolute' }]}>Thanh toán</Text>
                    </View>
                    <ScrollView horizontal style={{marginTop: 10}}>
                        <Image style={{width: Dimensions.get('window').width*0.2, height: Dimensions.get('window').width*0.2/9*13, borderRadius: 20, marginLeft: 20}} source={{uri: this.state.movie.image}}/>
                        <View style={{width: Dimensions.get('window').width*0.7,}}>                            
                            <Text style={styles.headText}>{this.state.movie.name}</Text>
                            <Text style={styles.typeText}>{this.state.movie.type}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Diễn viên: </Text>
                            <Text style={{ paddingLeft: 20 }}>{this.state.movie.actor}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Vé đã chọn: </Text>
                            <Text style={{ paddingLeft: 20 }}>{this.state.chosenSeats.toString()}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Đơn giá: {this.state.price}đ</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Tổng: {this.state.price*this.state.chosenSeats.length}đ</Text>
                        </View>
                    </ScrollView>
                    <Text style={[styles.headText,{textAlign: 'center'}]}>Hình thức thanh toán</Text>
                    <View style={{flex: 1, justifyContent: "center", marginLeft: Dimensions.get('window').width*0.2, marginTop: 30}}>
                        <TouchableOpacity style={{ backgroundColor: "#ae2070", width:  Dimensions.get('window').width*0.6, borderRadius: 40, paddingTop: 5, paddingBottom: 10, marginVertical: 5}} onPress={() => this.onClickThanhToan("momo")}><Text style={styles.hinhThucThanhToan}>Thanh toán bằng ví Momo</Text></TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#1492fd", width:  Dimensions.get('window').width*0.6, borderRadius: 40, paddingTop: 5, paddingBottom: 10, marginVertical: 5 }} onPress={() => this.onClickThanhToan("airpay")} ><Text style={styles.hinhThucThanhToan}>Thanh toán bằng AirPay</Text></TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: "#6772e5", width:  Dimensions.get('window').width*0.6, borderRadius: 40, paddingTop: 5, paddingBottom: 10, marginVertical: 5 }} onPress={() => this.onClickThanhToan("stripe")}><Text style={styles.hinhThucThanhToan}>Thanh toán bằng thẻ</Text></TouchableOpacity>
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
    },
    ngayChieuPhim: {
        backgroundColor: "rgb(255, 215, 70)",
        paddingBottom: 10,
        paddingTop: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 4,
    },
    ngayChieuPhimChosen: {
        backgroundColor: "rgb(255, 130, 70)",
        paddingBottom: 10,
        paddingTop: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 4,
    },
    gioChieuPhim: {
        backgroundColor: "#8c8c8c",
        paddingBottom: 10,
        paddingTop: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 4,
    },
    gioChieuPhimChosen: {
        backgroundColor: "rgb(255, 215, 70)",
        paddingBottom: 10,
        paddingTop: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginVertical: 10,
        marginHorizontal: 4,
    },
    seatContainer: {
        flex: 1,
        width: (Dimensions.get('window').width-50)/13,
        height: (Dimensions.get('window').width-50)/13,
        resizeMode: "cover",
        justifyContent: "center"
    },
    hinhThucThanhToan: {
        textAlign: 'center',
        fontFamily: 'UTMAvoBold',
        fontSize: 20,
        color: 'white'
    }
});

export default withNavigation(PaymentScreen)