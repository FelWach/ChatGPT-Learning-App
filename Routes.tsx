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
// for testing
import  ApiCalls  from './screens/apiCalls'
import  Features  from './screens/Features'
import { addQuestionsClickedAtom } from './screens/Configurator/atoms'


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
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="Login" component={Login} options={{ title: "" }}  />
            <Stack.Screen name="Register" component={Register} options={{ title: "" }}  />
            <Stack.Screen name="LearnSet" component={Learnset} options={{  title: "Learnset" }}  />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="Configurator" component={Configurator}/>
            <Stack.Screen name="Learning" component={Learning} options={{ title: "" }} />
            <Stack.Screen name="TopicsOverview" component={TopicsOverview} options={{ headerShown: false  }}  />
            <Stack.Screen name="Api" component={ApiCalls} options={{ title: "Api Calls" }}  />
            <Stack.Screen name="Features" component={Features} options={{ title: "" }}  />
        </Stack.Navigator>
    )
}
