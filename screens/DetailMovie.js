import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import TomatoesImage from '../assets/RottenTomatoes.png'
import StarImage from '../assets/Star.png'
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import YoutubePlayer from 'react-native-youtube-iframe'
import HTMLView from 'react-native-htmlview'
import DOMAIN from '../domain'
import { LinearGradient } from 'expo-linear-gradient';

class DetailMovie extends Component {
    constructor(props) {
        super(props)
        this.state = { movie: [], playing: true }
        this.onClickMuaVe = this.onClickMuaVe.bind(this)
    }
    componentDidMount() {
        fetch(`${DOMAIN.api}/movie/${this.props.navigation.state.params.movie}`)
            .then(response => response.json())
            .then(data => {
                fetch(`${DOMAIN.api}/movietime/${data._id}`)
                    .then(response => response.json())
                    .then(res => {
                        this.setState({ movie: data, movietimes: res, times: res, chosenDate: res })
                    })
            })
    }
    onClickMuaVe() {
        this.props.navigation.navigate('SeatScreen', {movie: this.state.movie, slug: this.props.navigation.state.params.movie})
    }
    render() {
        let startDate
        if (!this.state.movie.date)
            startDate = new Date(this.state.movie.date_start)
        else startDate = new Date(this.state.movie.date.date_start)
        let trailer = new String(this.state.movie.trailer)
        trailer = trailer.slice(trailer.search('embed/')+6).slice(0,trailer.slice(trailer.search('embed/')+6).search('"'))
        let description = this.state.movie.decription
        // description = new DOMParser().parseFromString(description,'text/html')
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
                        height: Dimensions.get('window').width,
                        borderRadius: 10,
                    }}>
                        <FontAwesomeIcon color="white" size={30} style={{ marginTop: StatusBar.currentHeight+10, marginLeft: 10, zIndex: 2, position: 'absolute' }} icon={faChevronLeft} onPress={() => this.props.navigation.goBack()} />
                        <LinearGradient colors={['transparent', 'white']} style={{ position: 'absolute', marginTop: Dimensions.get('window').width-200, height: 200, width: Dimensions.get('window').width, zIndex: 3}}></LinearGradient>
                        <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width, zIndex: 0}} source={{uri: this.state.movie.image}} />
                    </View>
                    <View>
                        <Text style={styles.headText}>{this.state.movie.name}</Text>
                        <Text style={styles.typeText}>{this.state.movie.type}</Text>
                        <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, paddingLeft: 20 }}>
                            <Image style={{ height: 30, width: 98, marginRight: 15 }} source={TomatoesImage} />
                            <Text style={{fontSize: 24, fontWeight: 'bold', fontFamily: 'UTMAvoBold',}}>{this.state.movie.rating}/5</Text>
                            <Image style={{ height: 30, width: 30 }} source={StarImage} />
                        </View>
                        <Text style={{ fontWeight: 'bold', paddingLeft: 20 }}>Diễn viên: </Text>
                        <Text style={{ paddingLeft: 20 }}>{this.state.movie.actor}</Text>
                        <Text style={{ paddingLeft: 20 }}><Text style={styles.boldText}>Ngày khởi chiếu: </Text>{`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</Text>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 12
                        }}>
                            <TouchableOpacity style={styles.buttonMuaVe} onPress={this.onClickMuaVe}>
                                <FontAwesomeIcon color="white" size={30} style={{ marginRight: 10, marginTop: 5 }} icon={faShoppingCart} /> 
                                <Text style={styles.textMuaVe}>MUA VÉ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <YoutubePlayer
                        height={Dimensions.get('window').width/16*10}
                        width={Dimensions.get('window').width}
                        videoId={trailer}
                        play={this.state.playing}
                        volume={50}
                        playbackRate={1}
                        initialPlayerParams={{
                            cc_lang_pref: "us",
                            showClosedCaptions: true
                        }}
                        />
                    </View>
                    <View>
                        <Text style={styles.headText}>Nội dung phim</Text>
                        <Text style={{ paddingLeft: 20 }}>
                            <HTMLView value={description} style={{width:Dimensions.get('window').width, paddingRight: 30}} />
                        </Text>
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
    }
});

export default withNavigation(DetailMovie)