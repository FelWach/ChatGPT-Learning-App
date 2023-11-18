import { TamaguiProvider, View } from 'tamagui'
import config from './tamagui.config'
import { useFonts } from 'expo-font'
import { Text, StyleSheet, StatusBar } from 'react-native'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Routes from './Routes'

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
    <NavigationContainer theme={DarkTheme}> 
      <StatusBar barStyle='light-content' />
      <TamaguiProvider config={config} defaultTheme='dark_blue'>
          <Routes />
      </TamaguiProvider>
    </NavigationContainer>
  )
}

