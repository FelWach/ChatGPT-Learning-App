import { H1, XStack, ScrollView, Text } from "tamagui";
import TabNavigator from '../components/TabNavigator/TabNavigator'

export default function NoLearnsets({ navigation }) {
    return (

          <ScrollView>
            <H1 size="$9" marginVertical="$3">Du hast noch keine Lernsets generiert!</H1>
            <XStack $sm={{ flexDirection: 'column' }} alignItems="center" space="$3">
              <Text>Leg los und kreiere dein erstes Lernset ganz nach deinen Belieben, indem du auf den Add Button klickst.</Text>
              <Text>Viel Spaß!</Text>
            </XStack>
            <XStack  flexDirection='column' alignItems='center' padding='$4'>
                  <TabNavigator navigation={navigation} value={'topicsOverview'} />
            </XStack>
          </ScrollView>

      );
}