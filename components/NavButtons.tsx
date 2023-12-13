import { Button, YStack } from 'tamagui';
import { Link } from '@react-navigation/native'
import { X, ArrowLeft } from '@tamagui/lucide-icons'

export function NavButtonArrow({ navigation, screen }) {
    return (
        <YStack marginVertical='$3'>
            <Link to={{ screen: screen }}><Button unstyled={true} circular={true} backgroundColor={'#0F1B2D'} icon={<ArrowLeft size='$2' margin="$3.5" />} /></Link>
        </YStack>
    )
}

export function NavButtonX({ navigation, screen }) {
    return (
        <YStack marginVertical='$3'>
            <Link to={{ screen: screen }} ><Button unstyled={true} circular={true} backgroundColor={'#0F1B2D'} icon={<X size='$2' margin='$3.5' />} /></Link>
        </YStack>

    )
}