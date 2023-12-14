import { Button, YStack, XStack } from 'tamagui';
import { SaveAreaView } from './SafeAreaView';
import { useWindowDimensions } from 'react-native';

export default function Header() {

  return (
    <SaveAreaView>
      <XStack></XStack>
    </SaveAreaView>
  )
}