import { Stack } from './App'
// import Screens
import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import UserSettings from './screens/UserSettings'
import Learning from './screens/Learning'
import { Learnset } from './screens/Learnset/Learnset'
import { TopicsOverview } from './screens/TopicsOverview/TopicsOverview'
import Profile from './screens/Profile'

import { NavButtonArrow, NavButtonX } from './components/NavButtons'

import { SafeAreaView } from "./components/SafeAreaView";

export default function Routes({ navigation }) {

/*
    const screens: Stack[] = [
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}  />,
        <Stack.Screen name="Login" component={Login} options={{ title: "" }}  />,
        <Stack.Screen name="Register" component={Register} options={{ title: "" }}  />,
        <Stack.Screen name="LearnSet" component={Learnset} options={{ title: "Learnset" }}  />,
        <Stack.Screen name="Profile" component={StartScreen} options={{ headerShown: false }}/> ,
        <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }}  />,
        <Stack.Screen name="QuestionsCatalogue" component={StartScreen} options={{ title: "" }}  />,
        <Stack.Screen name="LearnMode" component={StartScreen} options={{ title: "" }}  />
       ];
*/

    return (

        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerStyle: {backgroundColor: 'black'}, headerTintColor: 'white', headerBackVisible: false}}>
            {/*}{ screens.map((Stack) => { return Stack  }) } {*/}
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Login" component={Login} options={{ title: "", headerLeft: () => ( <NavButtonArrow screen={'StartScreen'} /> )}} />
            <Stack.Screen name="Register" component={Register} options={{ title: "", headerLeft: () => ( <NavButtonArrow screen={'StartScreen'} /> )}} />
            <Stack.Screen name="LearnSet" component={Learnset} options={{  title: "", headerLeft: () => ( <NavButtonArrow screen={'TopicsOverview'} /> )}} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }}  />
            <Stack.Screen name="Learning" component={Learning} options={{ title: "",  headerRight: () => ( <NavButtonX screen={'LearnSet'} /> )}} />
            <Stack.Screen name="TopicsOverview" component={TopicsOverview} options={{ headerShown: false  }}  />
            <Stack.Screen name="UserSettings" component={UserSettings} options={{ title: "" }}  />

        </Stack.Navigator>

    )

}
