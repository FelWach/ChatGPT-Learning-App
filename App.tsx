// this provides some helpful reset styles to ensure a more consistent look
// only import this from your web app, not native
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { Button } from 'tamagui'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routes from '/Routes.tsx'

// creating Native Stack Navigator
export const Stack = createNativeStackNavigator();

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
            <Routes />
            <TamaguiProvider config={config}>
                 <View style={{ padding: 20 }}></View>
            </TamaguiProvider>
    </NavigationContainer>
  )
}

