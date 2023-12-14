import { Stack } from './App'
// import Screens
import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import UserSettings from './screens/UserSettings'
import Learning from './screens/Learning/Learning'
import { Learnset } from './screens/Learnset/Learnset'
import { Configurator } from './screens/Configurator/Configurator'
import { TopicsOverview } from './screens/TopicsOverview/TopicsOverview'
import Profile from './screens/Profile'

import { NavButtonArrow, NavButtonX } from './components/NavButtons'
import { X, ArrowLeft } from '@tamagui/lucide-icons'
import Header from './components/Header'

// for testing
import  ApiCalls  from './screens/apiCalls'
import  Features  from './screens/Features'



export default function Routes({ }) {

    return (
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerStyle: {backgroundColor: 'black'}, headerTintColor: 'white', headerBackVisible: false }}>
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={({navigation}) => ({ headerTitle: () => "", headerLeft: () => (<NavButtonArrow navigation={navigation} />), })} />
            <Stack.Screen name="Register" component={Register} options={({navigation}) => ({ headerTitle: () => "", headerLeft: () => (<NavButtonArrow navigation={navigation} />), })} />
            <Stack.Screen name="LearnSet" component={Learnset} options={({navigation}) => ({ title: "", headerLeft: () => (<NavButtonArrow navigation={navigation} />), })} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }} />
            <Stack.Screen name="Learning" component={Learning} options={({navigation}) => ({ title: "", headerRight: () => (<NavButtonX navigation={navigation} />), })} />
            <Stack.Screen name="TopicsOverview" component={TopicsOverview} options={{ headerShown: false }} />
            <Stack.Screen name="UserSettings" component={UserSettings} options={{ title: "" }} />
        </Stack.Navigator>
    )
}
