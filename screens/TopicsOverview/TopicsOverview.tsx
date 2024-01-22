import { Button, ScrollView, Text } from 'tamagui';
import { H1, YStack } from 'tamagui';
import { TopicsCard } from '../../components/TopicCards/TopicsCard';
import { topicAtom, topicCardAtom} from '../../state/atoms';
import { atom, useAtom, useAtomValue } from 'jotai';
import { SafeAreaView } from '../../components/SafeAreaView';
import { Plus } from '@tamagui/lucide-icons';
import TabNavigator from '../../components/TabNavigator/TabNavigator';
import { GlobalLoadingIndicator } from '../../App';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import Profile from '../Profile';

export const valueAtom = atom<'topicsOverview'|'profile'>('topicsOverview')

export function TopicsOverview({ navigation }) {
  const [topicCards] = useAtom(topicCardAtom);
  const [currentTopic, setCurrentTopic] = useAtom(topicAtom);
  const value = useAtomValue(valueAtom)

  // TODO: adjust spacing and other styling
  return (
    <SafeAreaView>
      {value === 'topicsOverview' ? (
        <>
          {topicCards.length ? (
            <ScrollView >
              <YStack>
                <H1 size="$9" marginBottom="$4">Your Learnsets</H1>
                <YStack alignItems="center" space="$3">
                  {topicCards.map((topic, index) => (
                    <TopicsCard
                      key={index}
                      numberOfLearncards={topic.numberOfLearncards}
                      headline={topic.headline}
                      onPress={async () => {
                        setCurrentTopic(topic.headline);
                        navigation.navigate('LearnSet');
                      }}
                    />
                  ))}
                </YStack>
              </YStack>
              <Button icon={Plus} size="$5" variant="outlined" marginTop="$5" marginBottom="$14" pressStyle={{borderWidth: 3.5}} onPress={() => navigation.navigate('Configurator')}>
                Add Learnset
              </Button>
            </ScrollView>
          ) : (
            <>
              <YStack space="$5" marginHorizontal="$3">
                <H1 size="$9" color="#52A9FF">
                  You haven't generated any learning sets yet!
                </H1>
                <Text fontSize="$6" color="#52A9FF" lineHeight="$5">
                  Get started and create your first learning set according to your preferences by clicking the 'Add Learnset' button
                </Text>
                <Text fontSize="$6" color="#52A9FF" fontWeight="bold">
                  Have fun!
                </Text>
              </YStack>
              <Button icon={Plus} size="$5"  variant="outlined" marginVertical="$5" marginBottom="$10" pressStyle={{borderWidth: 3.5}} onPress={() => navigation.navigate('Configurator')}>
                Add Learnset
              </Button>
            </>
          )}
        </>
      ) : (
        <Profile navigation={navigation} />
      )}

      <YStack style={styles.shadowProp} alignSelf="center" position="absolute" marginTop={useWindowDimensions().height - 100}>
        <TabNavigator navigation={navigation} />
      </YStack>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  }
});
