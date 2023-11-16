// this provides some helpful reset styles to ensure a more consistent look
// only import this from your web app, not native
import { TamaguiProvider, Theme } from 'tamagui'
import config from './tamagui.config'
import { useFonts } from 'expo-font'
import { Text, StyleSheet, SafeAreaView, StatusBar, View } from 'react-native'
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

  const styles = StyleSheet.create({
    base: {
      backgroundColor: '#000',
      padding: 30,
      flex: 1,
    },
    view : {
      padding: 30,
      flex: 1,
    }
  });

  // TODO: Add Basic View with inital padding, wont work
  return (
    <TamaguiProvider config={config}>
    <NavigationContainer theme={DarkTheme}>
    <StatusBar barStyle="light-content" backgroundColor="black" />
        <SafeAreaView style={styles.base}>
            <Theme name={'dark_blue'}>
              <Routes />
            </Theme>
        </SafeAreaView>
    </NavigationContainer>
    </TamaguiProvider>
  )
}

