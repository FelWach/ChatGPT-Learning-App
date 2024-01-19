import config from './tamagui.config'
import { useFonts } from 'expo-font'
import { StatusBar, Text, useColorScheme } from 'react-native'
import { TamaguiProvider, H1, Theme, ThemeName, useForceUpdate } from 'tamagui'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { switchThemeAtom } from './state/atoms'
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './Routes'
import { Provider, useAtom, atom } from 'jotai'
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

// setting initial theme to dark theme
export const themeAtom = atom<ThemeName>('dark_blue');

// adapting background color of React Navigation's DarkTheme
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'rgb(8, 14, 23)'
  },
}

export function SwitchTheme({ }) {
  //const colorScheme: string = useColorScheme() as string;   for checking the colormode of the device settings
  const [switchOn, setSwitchOn] = useAtom(switchThemeAtom);
  const [theme, setTheme] = useAtom(themeAtom);

  if (switchOn) {
    setTheme('light_blue_alt1')
    console.log('switched theme to light theme');
  } else {
    setTheme('dark_blue')
    console.log('switched to dark theme');
  }


  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <Theme name={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={theme === 'light_blue_alt1' ? DefaultTheme : CustomDarkTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar barStyle='light-content' />
              <QueryClientProvider client={queryClient}>
                <HydrateAtoms>
                  <Routes />
                </HydrateAtoms>
              </QueryClientProvider>
            </GestureHandlerRootView>
          </NavigationContainer>
        </SafeAreaProvider>
      </Theme>
    </TamaguiProvider>
  )
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });


  if (!fontsLoaded) {
    return (
      <Text>{fontError?.message}</Text>
    )
  }

  return (
    <Provider>
      <SwitchTheme />
    </Provider>
  )
}

