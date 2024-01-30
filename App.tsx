import config from './tamagui.config'
import { useFonts } from 'expo-font'
import { StatusBar, Text, LogBox } from 'react-native'
import { TamaguiProvider, H1, Theme, ThemeName, useForceUpdate } from 'tamagui'
import { NavigationContainer } from '@react-navigation/native'
import { switchThemeAtom, themeColorAtom } from './state/atoms'
import { createStackNavigator } from '@react-navigation/stack';
import Routes from './Routes'
import { Provider, useAtom, atom, useAtomValue } from 'jotai'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useHydrateAtoms } from 'jotai/utils'
import { useMutation, useQueryClient, QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query'
import { atomsWithQuery, queryClientAtom } from 'jotai-tanstack-query'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {BlueDarkTheme, BlueLightTheme, RedDarkTheme, RedLightTheme, YellowDarkTheme, YellowLightTheme, GreenDarkTheme, GreenLightTheme, PurpleDarkTheme, PurpleLightTheme } from './components/ThemeColors'

export function GlobalLoadingIndicator() {
  const isFetching = useIsFetching()

  return isFetching ? (
    <H1>Queries are fetching in the background...</H1>
  ) : null
}

// Ignore all log notifications - for Test Mode only
LogBox.ignoreAllLogs();


// creating Stack Navigator
export const Stack = createStackNavigator();

const queryClient = new QueryClient()

const HydrateAtoms = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]])
  return children
}

// setting initial theme to dark theme
const themeAtom = atom<ThemeName>('dark_blue');
const containerThemeAtom = atom(BlueDarkTheme);

// adapting background color of React Navigation Container
export function SwitchTheme({ }) {
  //const colorScheme: string = useColorScheme() as string;   for checking the colormode of the device settings
  const switchOn = useAtomValue(switchThemeAtom);
  const [theme, setTheme] = useAtom(themeAtom);
  const themeColor = useAtomValue(themeColorAtom);
  const [containerTheme, setContainerTheme] = useAtom(containerThemeAtom);

  if (switchOn) {
    switch (themeColor) {
      case 'blue':
        setTheme('light_blue')
        setContainerTheme(BlueLightTheme);
        console.log('switched theme to light blue');
        break;
      case 'red':
        setTheme('light_red')
        setContainerTheme(RedLightTheme);
        console.log('switched theme to light red');
        break;
      case 'yellow':
        setTheme('light_yellow')
        setContainerTheme(YellowLightTheme);
        console.log('switched theme to light yellow');
        break;
      case 'green':
        setTheme('light_green')
        setContainerTheme(GreenLightTheme);
        console.log('switched theme to light green');
        break;
      case 'purple':
        setTheme('light_purple')
        setContainerTheme(PurpleLightTheme);
        console.log('switched theme to light purple');
        break;
      default:
        setTheme('light_blue')
        setContainerTheme(BlueLightTheme);
        console.log('switched theme to light blue');
        break;
    }

  } else {
    switch (themeColor) {
      case 'blue':
        setTheme('dark_blue')
        setContainerTheme(BlueDarkTheme);
        console.log('switched theme to dark blue');
        break;
      case 'red':
        setTheme('dark_red')
        setContainerTheme(RedDarkTheme);
        console.log('switched theme to dark red');
        break;
      case 'yellow':
        setTheme('dark_yellow')
        setContainerTheme(YellowDarkTheme);
        console.log('switched theme to dark yellow');
        break;
      case 'green':
        setTheme('dark_green')
        setContainerTheme(GreenDarkTheme);
        console.log('switched theme to dark green');
        break;
      case 'purple':
        setTheme('dark_purple')
        setContainerTheme(PurpleDarkTheme);
        console.log('switched theme to dark purple');
        break;
      default:
        setTheme('dark_blue')
        setContainerTheme(BlueDarkTheme);
        console.log('switched theme to darkt blue');
        break;
    }
  }

  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      <Theme name={theme}>
        <SafeAreaProvider>
          <NavigationContainer theme={containerTheme}>
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

