import { useFonts } from 'expo-font'
import { StyleSheet, StatusBar } from 'react-native'
import { Button, View, Text, TamaguiProvider, H1 } from 'tamagui'
import config from './tamagui.config'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
//import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './Routes'
import { Provider } from 'jotai'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useHydrateAtoms } from 'jotai/utils'
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query'
import { atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'


export function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <H1>Queries are fetching in the background...</H1>
  ) : null
}

// creating Stack Navigator
export const Stack = createStackNavigator();

const queryClient = new QueryClient()

const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

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
      <SafeAreaProvider>
        <NavigationContainer theme={DarkTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle='light-content' />
            <TamaguiProvider config={config} defaultTheme='dark_blue'>
              <QueryClientProvider client={queryClient}>
                <HydrateAtoms>
                  <Routes />
                </HydrateAtoms>
              </QueryClientProvider>
            </TamaguiProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

