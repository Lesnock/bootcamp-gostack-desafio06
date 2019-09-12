import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import User from './pages/User'
import SiteView from './pages/SiteView'

const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User,
        SiteView,
    }, {
        headerLayoutPreset: 'center',
        headerBackTitleVisible: false,
        defaultNavigationOptions: {
            headerStyle: { backgroundColor: '#7159c1' },
            headerTintColor: '#FFF',
            headerTitleStyle: { fontWeight: 'bold' },
        },
    }),
)

export default Routes