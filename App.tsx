import { useFonts } from 'expo-font'
import { StyleSheet, StatusBar } from 'react-native'
import { Button, View, Text, TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routes from './Routes'
import { Provider } from 'jotai'
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

  // added DarkTheme to NavigationContainer to make background color dark
  return (
    <Provider>
      <NavigationContainer theme={DarkTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' />
          <TamaguiProvider config={config} defaultTheme='dark_blue'>
            <Routes />
          </TamaguiProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  )
}

