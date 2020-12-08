import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font'
import AppNavigator from './navigations/Navigator'
import {AppLoading} from 'expo'
import { setJSExceptionHandler } from "react-native-exception-handler";

setJSExceptionHandler((error, isFatal) => {
  console.log(error, isFatal)
}, true);

let fontUTM = {
  'UTMAvo': require('./assets/Fonts/UTMAVO.ttf'),
  'UTMAvoBold': require('./assets/Fonts/UTMAVOBOLD.ttf'),
}
export default class App extends Component {
  state = {
    fontLoaded: false
  }
  async componentDidMount() {
    await Font.loadAsync(fontUTM)
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
});
