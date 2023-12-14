import { Button, YStack } from 'tamagui';
import { X, ArrowLeft } from '@tamagui/lucide-icons'

export function NavButtonArrow({ navigation }) {
    return (
        <YStack marginVertical='$4'>
            <Button onPress={() => navigation.goBack()} unstyled={true} circular={true} size="$5" backgroundColor={'#0F1B2D'} alignItems="center" justifyContent="center" icon={<ArrowLeft  size="$1"/>} />
        </YStack>
    )
}

export function NavButtonX({ navigation }) {
    return (
        <YStack marginVertical='$4'>
            <Button onPress={() => navigation.goBack()} unstyled={true} circular={true} backgroundColor={'#0F1B2D'} alignItems="center" justifyContent="center" icon={<X size="$1"/>} />
        </YStack>

    )
}