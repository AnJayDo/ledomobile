import React from 'react';
import { Component } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MovieCard from './MovieCard'

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] }
    }

    componentDidMount() {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(data => this.setState({ movies: data }))
    }

    render() {
        const movies = this.state.movies.filter(e => e.playing == true).map(movie => <MovieCard movie={movie} />)
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
    },
});

export default Movies;