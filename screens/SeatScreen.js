import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar, ImageBackground } from 'react-native';
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

import DOMAIN from '../domain'

import seatAvailable from '../assets/167947-200.png'
import seatUnavailable from '../assets/167947-201.png'
import chosenSeat from '../assets/167947-202.png'

const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('jwt')
      if(value !== null) {
      }
      return("")
    } catch(e) {
      // error reading value
    }
}

class SeatScreen extends Component {
    constructor(props) {
        super(props)       
        let jwt = getData()
        let suatchieu = []
        let today = new Date()
        suatchieu.push(today)
        if(today.getDay()>0) {
            for(let i=today.getDay(); i<7; i++) {
                suatchieu.push(new Date(suatchieu[suatchieu.length-1].getTime()+86400000))
            }
        }
        suatchieu=suatchieu.map(day => {return({date: day, active: false })})
        suatchieu[0].active=true
        this.state = { movie: [], times: [], suatchieu: suatchieu, chosenDate: [], chosenDateID: (new Date()).toLocaleDateString(), chosenTime: "", price: 30000,seats: [], chosenSeats: [], token: jwt }
        this.updateTime = this.updateTime.bind(this)
        this.updateGio = this.updateGio.bind(this)
        this.chooseSeat = this.chooseSeat.bind(this)
        this.unchooseSeat = this.unchooseSeat.bind(this)
    }
    componentDidMount() {
        fetch(`${DOMAIN.api}/movie/${this.props.navigation.state.params.slug}`)
            .then(response => response.json())
            .then(data => {
                fetch(`${DOMAIN.api}/movietime/${data._id}`)
                    .then(response => response.json())
                    .then(res => {
                        let giochieu = res.filter(mvt => (new Date(mvt.movietime.date)).toLocaleDateString()==(new Date()).toLocaleDateString())
                        .map(mvt => {
                            mvt.active = false
                            return(mvt)
                        })
                        giochieu[0].active=true
                        let seats = giochieu[0].movietime.seat.map(row => row.map(column => {
                            if(column.available==false)
                                column.active=false
                            return(column)
                        }))
                        this.setState({ movie: data, times: res, chosenDate: giochieu, chosenTime: giochieu[0]._id, price: giochieu[0].movietime.price,seats: seats })
                    })
            })
    }
    updateTime(key) {
        let suatchieu = this.state.suatchieu
        suatchieu[suatchieu.findIndex(e => e.active==true)].active=false
        suatchieu[suatchieu.findIndex(e => e.date.toLocaleDateString()==key)].active=true
        this.setState({suatchieu:suatchieu})
        let giochieu = this.state.times.filter( mvt => (new Date(mvt.movietime.date)).toLocaleDateString()==key )
        if(giochieu.length==0) this.setState({chosenDate: [], seats: []})
        else {
            giochieu.map(mvt => {
                mvt.active = false
                return(mvt)
            })
            giochieu[0].active=true
            let seats = giochieu[0].movietime.seat.map(row => row.map(column => {
                if(column.available==false)
                    column.active=false
                return(column)
            }))
            this.setState({chosenDate: giochieu, seats: giochieu[0].movietime.seat, price: giochieu[0].movietime.price, seats: seats,chosenSeats: []})
        }
    }
    updateGio(key) {
        let {chosenDate} = this.state
        chosenDate[chosenDate.findIndex( mvt => mvt.active==true )].active=false
        chosenDate[chosenDate.findIndex( mvt => mvt._id==key )].active=true
        let movietime = chosenDate[chosenDate.findIndex( mvt => mvt._id==key )].movietime
        let seats = movietime.seat.map(row => row.map(column => {
            if(column.available==false)
                column.active=false
            return(column)
        }))
        this.setState({chosenDate: chosenDate, chosenTime: key, price: movietime.price,seats: seats, chosenSeats: []})
    }
    chooseSeat(key) {
        let seats = this.state.seats
        for(let i=0; i<seats.length; i++) {
            if(seats[i].findIndex(e => e.id==key)>=0) {
                seats[i][seats[i].findIndex(e => e.id==key)].active=true
            }
        }
        let chosenSeats = this.state.chosenSeats
        chosenSeats.push(key)
        this.setState({seats: seats, chosenSeats: chosenSeats})
    }
    unchooseSeat(key) {
        let seats = this.state.seats
        for(let i=0; i<seats.length; i++) {
            if(seats[i].findIndex(e => e.id==key)>=0) {
                seats[i][seats[i].findIndex(e => e.id==key)].active=false
            }
        }
        let chosenSeats = this.state.chosenSeats.filter(e => e!==key)
        this.setState({seats: seats, chosenSeats: chosenSeats})
    }
    onClickThanhToan() {
        console.log(this.state.token)
        if(!this.state.token) {
            console.log('Pressed')
        } else this.props.navigation.navigate('UserScreen')
    }
    render() {
        let suatchieu = this.state.suatchieu
        suatchieu=suatchieu.map(e => {
            const date = new Date(e.date)
            if(e.active==true) {
                return(<TouchableOpacity style={styles.ngayChieuPhimChosen} onPress={() => this.updateTime(date.toLocaleDateString())}>
                    <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: 20}}>{date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()}</Text>
                </TouchableOpacity>)
            }
            else
            return(<TouchableOpacity style={styles.ngayChieuPhim} onPress={() => this.updateTime(date.toLocaleDateString())}>
                    <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: 20}}>{date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()}</Text>
                </TouchableOpacity>)
        })
        const giochieu = this.state.chosenDate.map(gio => {
            if(gio.active==true)
                return(
                    <TouchableOpacity style={styles.gioChieuPhimChosen} onPress={() => this.updateGio(gio._id)}>
                        <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: 20}}>{gio.movietime.hour}</Text>
                    </TouchableOpacity>)
            else
                return(
                    <TouchableOpacity style={styles.gioChieuPhim} onPress={() => this.updateGio(gio._id)}>
                        <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: 20}}>{gio.movietime.hour}</Text>
                    </TouchableOpacity>)
        })
        const seats = this.state.seats.map(row =>
            <ScrollView horizontal>{row.map(column => {
                if (column.available == false) {
                    if(column.active == true)
                    return (
                        <TouchableOpacity onPress={() => this.unchooseSeat(column.id)}>
                            <ImageBackground source={chosenSeat} style={styles.seatContainer}>
                                <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: Dimensions.get('window').width/34, textAlign: "center", paddingBottom: '20%'}}>{column.id}</Text>
                            </ImageBackground>
                        </TouchableOpacity>)
                    else
                    return (
                        <TouchableOpacity  onPress={() => this.chooseSeat(column.id)}>
                            <ImageBackground source={seatAvailable} style={styles.seatContainer}>
                                <Text style={{fontFamily: 'UTMAvoBold', color: 'white', fontSize: Dimensions.get('window').width/34, textAlign: "center", paddingBottom: '20%'}}>{column.id}</Text>
                            </ImageBackground>
                        </TouchableOpacity>)
                }
                else return (<ImageBackground source={seatUnavailable} style={styles.seatContainer}><Text className="seatUnavailable">{column.id}</Text></ImageBackground>)
            })}</ScrollView>)
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
                        <Text style={[styles.headText,{marginTop: StatusBar.currentHeight+2, marginLeft: 40, zIndex: 2, position: 'absolute' }]}>Chọn suất chiếu và vé</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginHorizontal: 20, }}
                    >
                        {suatchieu}
                    </ScrollView>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginHorizontal: 20, padding: 10, minHeight: 90, backgroundColor: "#f3f3f3", borderRadius: 30 }}
                    >
                        {giochieu}
                    </ScrollView>
                    <View style={{ margin: 10, paddingHorizontal: 15, paddingVertical: 23, minHeight: 600, backgroundColor: "#e6e6e6", borderRadius: 30}}>
                        {seats}
                    </View>
                    <ScrollView horizontal>
                        <Image style={{width: Dimensions.get('window').width*0.2, height: Dimensions.get('window').width*0.2/9*13, borderRadius: 20, marginLeft: 20}} source={{uri: this.state.movie.image}}/>
                        <View style={{width: Dimensions.get('window').width*0.7,}}>                            
                            <Text style={styles.headText}>{this.state.movie.name}</Text>
                            <Text style={styles.typeText}>{this.state.movie.type}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Diễn viên: </Text>
                            <Text style={{ paddingLeft: 20 }}>{this.state.movie.actor}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Vé đã chọn: </Text>
                            <Text style={{ paddingLeft: 20 }}>{this.state.chosenSeats.toString()}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Đơn giá: {this.state.price}</Text>
                            <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Tổng: {this.state.price*this.state.chosenSeats.length}</Text>
                            <View style={{
                                width: Dimensions.get('window').width*0.7,
                                alignItems: 'flex-end',
                                marginTop: 12
                            }}>
                                <TouchableOpacity style={styles.buttonMuaVe} onPress={this.onClickThanhToan}>
                                    <FontAwesomeIcon color="white" size={30} style={{ marginRight: 10, marginTop: 5 }} icon={faShoppingCart} /> 
                                    <Text style={styles.textMuaVe}>Thanh toán</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
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
    }
});

export default withNavigation(SeatScreen)