import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import DetailMovie from '../screens/DetailMovie'
import DetailEvent from '../screens/DetailEvent'
import SeatScreen from '../screens/SeatScreen'
import UserScreen from '../screens/UserScreen'
import PaymentScreen from '../screens/PaymentScreen'
import MomoPayment from '../screens/MomoPayment'
import Events from '../screens/Events'

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
    Events: {
        screen: Events,
        navigationOptions: ({ navigation }) => ({
            title: `Events`,
        })
    },
    DetailMovie: {
        screen: DetailMovie,
        navigationOptions: ({ navigation }) => ({
            title: `Detail Movie`,
        })
    },
    DetailEvent: {
        screen: DetailEvent,
        navigationOptions: ({ navigation }) => ({
            title: `Detail Event`,
        })
    },
    SeatScreen: {
        screen: SeatScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Seat Screen`,
        })
    },
    UserScreen: {
        screen: UserScreen,
        navigationOptions: ({ navigation }) => ({
            title: `User Screen`,
        })
    },
    PaymentScreen: {
        screen: PaymentScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Payment Screen`,
        })
    },
    MomoPayment: {
        screen: MomoPayment,
        navigationOptions: ({ navigation }) => ({
            title: `Momo Payment`,
        })
    }
},
    {
        defaultNavigationOptions: stackNavigationOptions
    })

export default createAppContainer(AppNavigator)