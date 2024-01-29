import { Button } from 'tamagui';
import { X, ArrowLeft } from '@tamagui/lucide-icons'


export function NavButtonArrow({ navigation }) {
    return (
        <Button onPress={() => navigation.goBack()} unstyled={true} circular={true}  size="$4"  pressStyle={{scale: 1.25}} alignItems="center" justifyContent="center" icon={<ArrowLeft size="$2" />} />
    )
}

export function NavButtonX({ navigation }) {
    return (
        <Button onPress={() => navigation.goBack()} unstyled={true} circular={true} size="$4"  pressStyle={{scale: 1.25}} alignItems="center" justifyContent="center" icon={<X size="$2" />} />
    )
}