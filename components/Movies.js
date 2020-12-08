import React from 'react';
import { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import DOMAIN from '../domain';
import MovieCard from './MovieCard'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [,] }
    }

    componentDidMount() {
        fetch(DOMAIN.api)
            .then(response => response.json())
            .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.filter(e => e.playing == true).map(movie => <MovieCard key={movie._id} movie={movie} />)
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollMovie}
            >
                {movies}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollMovie: {
        flex: 1,
        paddingHorizontal: 10,
        minHeight: 220
    },
});

export default Movies;