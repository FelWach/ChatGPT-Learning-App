// this provides some helpful reset styles to ensure a more consistent look

// only import this from your web app, not native


import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { Button } from 'tamagui'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native';
import Learning from './screens/Learning';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView>
      <View style={{ padding: 20 }}>
        <Learning/>
      </View>
      </GestureHandlerRootView>

    </TamaguiProvider>

  )

}
