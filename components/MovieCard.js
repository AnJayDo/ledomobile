import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.onPressMovie = this.onPressMovie.bind(this)
    }
    onPressMovie () {
        this.props.navigation.navigate('DetailMovie',{movie:this.props.movie.slug});
    }
    render() {
        return (
            <TouchableOpacity onPress={this.onPressMovie} style={styles.movieCardHolder}>
                <Image source={{uri: this.props.movie.image}} style={styles.movieCard} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    movieCard: {
        width: 200,
        height: 300,
        borderRadius: 10
    },
    movieCardHolder: {
        flex: 0.5,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        margin: 5
    }
})

export default withNavigation(MovieCard)
