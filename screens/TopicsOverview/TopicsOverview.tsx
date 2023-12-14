import { Button, ScrollView, Text } from 'tamagui';
import { H1, YStack } from 'tamagui';
import { TopicsCard } from '../../components/TopicCards/TopicsCard';
import { topicAtom, topicCardAtom } from '../../state/atoms';
import { useAtom } from 'jotai';
import { SaveAreaView } from '../../components/SafeAreaView/SafeAreaView';
import { Plus } from '@tamagui/lucide-icons';
import TabNavigator from '../../components/TabNavigator/TabNavigator';
import { GlobalLoadingIndicator } from '../../App';
import { useWindowDimensions } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';

export function TopicsOverview({ navigation }) {
  const [topicCards] = useAtom(topicCardAtom);
  const [, setCurrentTopic] = useAtom(topicAtom);

  // TODO: adjust spacing and other styling
  // TODO: add MenuButton to navigate to ProfileScreen
  return (
    <ScrollView>
      <SaveAreaView>
        {topicCards.length ? (
            <YStack>
              <H1 size="$9" marginBottom="$4" marginTop="$6">Your Learnsets</H1>
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
        ) : (
          <YStack space="$5" marginTop="$8" marginHorizontal="$3">
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
        )}
         <Button icon={Plus} size="$5" variant="outlined" marginVertical="$5" marginBottom="$15" onPress={() => navigation.navigate('Configurator')}>
                    Add Learnset
            </Button>
        <YStack alignSelf="center" height={useWindowDimensions().height - 100} justifyContent="flex-end" position="absolute">
        <TabNavigator navigation={navigation} value={'topicsOverview'} />
      </YStack>
      </SaveAreaView>
    </ScrollView >
  );
}
