import { Button, YStack } from 'tamagui';
import { X, ArrowLeft } from '@tamagui/lucide-icons'


export function NavButtonArrow({ navigation }) {
    return (
        <Button onPress={() => navigation.goBack()} unstyled={true} circular={true}  size="$4" backgroundColor={'#0F1B2D'} pressStyle={{bg: "#0A4481"}} alignItems="center" justifyContent="center" icon={<ArrowLeft size="$1" />} />
    )
}

export function NavButtonX({ navigation }) {
    return (
        <Button onPress={() => navigation.goBack()} unstyled={true} circular={true} size="$4" backgroundColor={'#0F1B2D'} pressStyle={{bg: "#0A4481"}} alignItems="center" justifyContent="center" icon={<X size="$1" />} />
    )
}