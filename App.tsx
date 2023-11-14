// this provides some helpful reset styles to ensure a more consistent look

// only import this from your web app, not native


import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { Button } from 'tamagui'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native';
import Login from './screens/Login';

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

    <TamaguiProvider config={config}>

      <View style={{ padding: 20 }}>
        <Login />
      </View>

    </TamaguiProvider>

  )

}
