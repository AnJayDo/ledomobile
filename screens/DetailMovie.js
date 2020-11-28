import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import TomatoesImage from '../assets/RottenTomatoes.png'
import StarImage from '../assets/Star.png'
import Tabs from '../components/Tabs'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { withNavigation } from 'react-navigation'
import YoutubePlayer from 'react-native-youtube-iframe';

class DetailMovie extends Component {
    constructor(props) {
        super(props)
        this.state = { movie: [], movietimes: [], times: [], chosenDate: [], chosenTime: "", playing: true }
        // this.updateTime = this.updateTime.bind(this)
    }
    componentDidMount() {
        fetch(`http://localhost:3000/movie/${this.props.navigation.state.params.movie}`)
            .then(response => response.json())
            .then(data => {
                fetch(`http://localhost:3000/movietime/${data._id}`)
                    .then(response => response.json())
                    .then(res => {
                        this.setState({ movie: data, movietimes: res, times: res, chosenDate: res })
                    })
            })
    }
    render() {
        let startDate
        if (!this.state.movie.date)
            startDate = new Date(this.state.movie.date_start)
        else startDate = new Date(this.state.movie.date.date_start)
        return (
            <View style={{
                height: '100%',
                width: "100%",
                backgroundColor: 'white',
                fontFamily: 'UTMAvo'
            }}>
                <ScrollView style={{
                    height: innerHeight - 100,
                    width: "100%",
                    backgroundColor: 'white',
                    fontFamily: 'UTMAvo'
                }}>
                    <View style={{
                        width: '100%',
                        height: '400px',
                        borderRadius: '10px',
                        background: `linear-gradient(to bottom, transparent, transparent, white),center/cover url('${this.state.movie.image}') no-repeat`,
                    }}>
                        <FontAwesomeIcon color="white" size={30} style={{ padding: '10px' }} icon={faChevronLeft} onClick={() => this.props.navigation.goBack()} />
                    </View>
                    <View>
                        <Text style={styles.headText}>{this.state.movie.name}</Text>
                        <Text style={styles.typeText}>{this.state.movie.type}</Text>
                        <View style={{ flexDirection: 'row', width: '100%', fontSize: '24px', fontWeight: 'bold', fontFamily: 'UTMAvoBold', paddingLeft: '20px' }}>
                            <Image style={{ height: '30px', width: '98px', marginRight: '15px' }} source={TomatoesImage} />
                            {this.state.movie.rating}/5
                            <Image style={{ height: '30px', width: '30px' }} source={StarImage} />
                        </View>
                        <Text style={{ fontWeight: 'bold', paddingLeft: '20px' }}>Diễn viên: </Text>
                        <Text style={{ paddingLeft: '20px' }}>{this.state.movie.actor}</Text>
                        <Text style={{ paddingLeft: '20px' }}><Text style={styles.boldText}>Ngày khởi chiếu: </Text>{`${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`}</Text>
                        <View style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '12px'
                        }}>
                            <TouchableOpacity style={styles.buttonMuaVe} onClick={this.onClickMuaVe}>
                                <FontAwesomeIcon color="white" size={30} style={{ paddingHorizontal: '10px' }} icon={faShoppingCart} /> MUA VÉ
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <YoutubePlayer
                        height={300}
                        width={400}
                        videoId={"jzD_yyEcp0M"}
                        play={this.state.playing}
                        onChangeState={event => console.log(event)}
                        onReady={() => console.log("ready")}
                        onError={e => console.log(e)}
                        onPlaybackQualityChange={q => console.log(q)}
                        volume={50}
                        playbackRate={1}
                        initialPlayerParams={{
                            cc_lang_pref: "us",
                            showClosedCaptions: true
                        }}
                        />
                    </View>
                </ScrollView>
                <Tabs />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    movieCardHolder: {
        flex: 0.5,
        borderRadius: '10px',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        margin: 5,
        height: 'fit-content'
    },
    boldText: {
        fontWeight: 'bold'
    },
    typeText: {
        color: 'gray',
        paddingLeft: '20px',
        maxHeight: '20px'
    },
    headText: {
        fontFamily: 'UTMAvoBold',
        width: '100%',
        paddingLeft: '20px',
        fontSize: '25px',
        lineHeight: '27px',
        color: "rgb(255,215,70)"
    },
    buttonMuaVe: {
        fontFamily: 'UTMAvoBold',
        color: "white",
        fontSize: '26px',
        backgroundColor: "rgb(255, 215, 70)",
        flexDirection: 'row',
        paddingLeft: '20px',
        paddingRight: '30px',
        paddingVertical: '8px',
        width: 'fit-content',
        borderRadius: '30px'
    }
});

export default withNavigation(DetailMovie)