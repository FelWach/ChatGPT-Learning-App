//import Native Stack Navigator
import { Stack } from './App'
// import Screens
import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import Learning from './screens/Learning/Learning'
import { Learnset } from './screens/Learnset/Learnset'
import { Configurator } from './screens/Configurator/Configurator'
import { TopicsOverview } from './screens/TopicsOverview/TopicsOverview'
import Profile from './screens/Profile'
import { NavButtonArrow, NavButtonX } from './components/NavButtons'

// for testing
import ApiCalls from './screens/apiCalls'
import Features from './screens/Features'


export default function Routes({}) {

    return (
        <Stack.Navigator initialRouteName="Login"
            screenOptions={({ navigation }) => ({
                headerTitle: "",
                headerTransparent: true,
                headerLeftContainerStyle: { margin: 20, padding: 20 },
                headerRightContainerStyle: { margin: 20, padding: 20 },
                headerLeft: () => (<NavButtonArrow navigation={navigation} />)
            })}>
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="LearnSet" component={Learnset} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Configurator" component={Configurator} options={({ navigation }) => ({ headerLeft: () => (<></>), headerRight: () => (<NavButtonX navigation={navigation} />) })} />
            <Stack.Screen name="Learning" component={Learning} options={({ navigation }) => ({ headerLeft: () => (<></>), headerRight: () => (<NavButtonX navigation={navigation} />) })} />
            <Stack.Screen name="TopicsOverview" component={TopicsOverview} options={{ headerShown: false }} />

            <Stack.Screen name="Api" component={ApiCalls} />
            <Stack.Screen name="Features" component={Features} />
        </Stack.Navigator>
    )
}
