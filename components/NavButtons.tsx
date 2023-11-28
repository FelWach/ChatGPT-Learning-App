import { Button } from 'tamagui';
import { Link } from '@react-navigation/native'
import { X, ArrowLeft } from '@tamagui/lucide-icons'

export function NavButtonArrow({navigation, screen}){
    return(
        <Link to={{ screen: screen }}><Button  unstyled={true}  circular={true} backgroundColor={'#0F1B2D'}  icon={<ArrowLeft size='$2' margin="$3.5" />} /></Link>
    )
}

export function NavButtonX({navigation, screen}){
    return(
        <Link to={{ screen: screen }} ><Button  unstyled={true}  circular={true} backgroundColor={'#0F1B2D'} icon={<X size='$2' margin='$3.5' />} /></Link>
    )
}