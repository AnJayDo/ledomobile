import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class MovieCard extends Component {
    constructor(props) {
        super(props)
    }
    // onPressMovie () {
    //     this.props.navigation.
    //     console.log('pressed')
    // }
    render() {
        const logo = this.props.movie.image
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('DetailMovie',{movie:this.props.movie.slug});
              }} style={styles.movieCardHolder}>
                <Image source={logo} style={styles.movieCard} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    movieCard: {
        width: '130px',
        height: '200px',
        borderRadius: '10px'
    },
    movieCardHolder: {
        flex: 0.5,
        borderRadius: '10px',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        margin: 5,
        height: 'fit-content'
    }
})

export default withNavigation(MovieCard)
