import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import DetailMovie from '../screens/DetailMovie'

const stackNavigationOptions = {
    headerShown: false
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            title: `Home`,
        })
    },
    DetailMovie: {
        screen: DetailMovie,
        navigationOptions: ({ navigation }) => ({
            title: `Detail`,
        })
    }
},
    {
        defaultNavigationOptions: stackNavigationOptions
    })

export default createAppContainer(AppNavigator)