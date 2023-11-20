import { useFonts } from 'expo-font'
// Tamagui
import { Button, View, Text } from 'tamagui'
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routes from './Routes'
// Jotai
import { Provider } from 'jotai'
// React Gesture Handler
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <Provider>
      <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <TamaguiProvider config={config}>
                  <Routes />
              </TamaguiProvider>
          </GestureHandlerRootView>    
      </NavigationContainer>
    </Provider>
  )
}

