import { Stack } from './App'
// import Screens
import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import UserSettings from './screens/UserSettings'
import Learning from './screens/Learning'
import { Learnset } from './screens/Learnset/Learnset'
import { TopicsOverview } from './screens/TopicsOverview/TopicsOverview'

// for testing
import  ApiCalls  from './screens/apiCalls'


export default function Routes() {

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
        <Stack.Navigator initialRouteName="StartScreen">
            {/*}{ screens.map((Stack) => { return Stack  }) } {*/}
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Login" component={Login} options={{ title: "" }}  />
            <Stack.Screen name="Register" component={Register} options={{ title: "" }}  />
            <Stack.Screen name="LearnSet" component={Learnset} options={{  title: "Learnset" }}  />
            <Stack.Screen name="Profile" component={StartScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }}  />
            <Stack.Screen name="Learning" component={Learning} options={{ title: "" }}  />
            <Stack.Screen name="TopicsOverview" component={TopicsOverview} options={{ title: "Deine Lernsets" }}  />
            <Stack.Screen name="UserSettings" component={UserSettings} options={{ title: "" }}  />
            <Stack.Screen name="Api" component={ApiCalls} options={{ title: "Api Calls" }}  />

        </Stack.Navigator>
    )
}
