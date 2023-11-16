import { Stack } from './App'
// import Screens
import StartScreen from './screens/StartScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import { Learnset } from './screens/Learnset/Learnset';



export default function Routes() {

    // TODO: Cusotmize header 
    const screens: Stack[] = [
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />,
        <Stack.Screen name="Login" component={Login} options={{ title: "" }} />,
        <Stack.Screen name="Register" component={Register} options={{ title: "" }} />,
        <Stack.Screen name="LearnSet" component={Learnset} options={{ title: "Learnset" }} />,
        <Stack.Screen name="Profile" component={StartScreen} options={{ headerShown: false }} />,
        <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }} />,
        <Stack.Screen name="QuestionsCatalogue" component={StartScreen} options={{ title: "" }} />,
        <Stack.Screen name="LearnMode" component={StartScreen} options={{ title: "" }} />
    ];

    return (
        <Stack.Navigator>
            {screens.map((Stack) => { return Stack })}
        </Stack.Navigator>
    )
}
