import { Button, H2, Text, View, XStack } from 'tamagui';
import TabNavigator from '../components/TabNavigator/TabNavigator'

export default function TopicsOverview({ navigation }){

    return(
    <View>
        <H2>Your Learn Sets</H2>
        <XStack  flexDirection='column' alignItems='center' padding='$4'>
            <TabNavigator navigation={navigation} value={'profile'} />
        </XStack>
    </View>
    )
}