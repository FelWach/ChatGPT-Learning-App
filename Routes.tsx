import { Stack } from '/App.tsx'

// import Screens
import StartScreen from './screens/StartScreen.tsx'
import Login from './screens/Login.tsx'
import Register from './screens/Register.tsx'


export default function Routes() {

    const screens: Stack[] = [
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />,
        <Stack.Screen name="Login" component={Login} options={{ title: "" }} />,
        <Stack.Screen name="Register" component={Register} options={{ title: "" }} />,
        <Stack.Screen name="LearnSet" component={StartScreen} options={{ headerShown: false }} />,
        <Stack.Screen name="Profile" component={StartScreen} options={{ headerShown: false }} />,
        <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }} />,
        <Stack.Screen name="QuestionsCatalogue" component={StartScreen} options={{ title: "" }} />,
        <Stack.Screen name="LearnMode" component={StartScreen} options={{ title: "" }} />
       ];

    return (
        <Stack.Navigator initialRouteName="StartScreen">
            { screens.map((Stack) => { return Stack  }) }
        </Stack.Navigator>
    )
}