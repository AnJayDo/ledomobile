import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font'
import AppNavigator from './navigations/Navigator'
import {AppLoading} from 'expo'

export default class App extends Component {
  state = {
    fontLoaded: false
  }
  async componentDidMount() {
    Font.loadAsync({
      'UTMAvo': require('./assets/Fonts/UTMAVO.TTF'),
      'UTMAvoBold': require('./assets/Fonts/UTMAVOBOLD.TTF'),
    })
    this.setState({fontLoaded: true})
  }
  render() {
    return (
      (this.state.fontLoaded==false)?(<AppLoading />):(<AppNavigator />)
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: "100%",
    width: "100%"
  },
});
