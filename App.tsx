// this provides some helpful reset styles to ensure a more consistent look
// only import this from your web app, not native
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { Button } from 'tamagui'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screens import
import StartScreen from './screens/StartScreen.tsx'
import Login from './screens/Login.tsx'
import Register from './screens/Register.tsx'

// creating Native Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>{fontError?.message}</Text>
      </View>
    )
  }

  return (

    <NavigationContainer>
            <Stack.Navigator initialRouteName="StartScreen">
                <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ title: "" }}/>
                <Stack.Screen name="Register" component={Register} options={{ title: "" }}/>
                <Stack.Screen name="LearnSet" component={StartScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Profile" component={StartScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Configurator" component={StartScreen} options={{ title: "" }}/>
                <Stack.Screen name="QuestionsCatalogue" component={StartScreen} options={{ title: "" }}/>
                <Stack.Screen name="LearnMode" component={StartScreen} options={{ title: "" }}/>
            </Stack.Navigator>
            <TamaguiProvider config={config}>
                 <View style={{ padding: 20 }}></View>
            </TamaguiProvider>
    </NavigationContainer>

  )
}

