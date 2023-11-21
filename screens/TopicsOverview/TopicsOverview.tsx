import { H1, XStack, ScrollView } from "tamagui";
import { TopicsCard } from "../../components/TopicCards/TopicsCard";
import { TopicCardProps } from "../../components/TopicCards/types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import TabNavigator from '../../components/TabNavigator/TabNavigator'

const dataAtom = atom<TopicCardProps[]>([]);

export function TopicsOverview({ navigation }) {

  const [data, setData] = useAtom(dataAtom);

  const dummyData: TopicCardProps[] = [
    {
      headline: 'Geografie',
      numberOfLearncards: 5
    },
    {
      headline: 'Biologie',
      numberOfLearncards: 6
    },
    {
      headline: 'Chemie',
      numberOfLearncards: 7
    },
    {
      headline: 'Mathe',
      numberOfLearncards: 8
    },
    {
      headline: 'Informatik',
      numberOfLearncards: 9
    },
    {
      headline: 'Geschichte',
      numberOfLearncards: 10
    },
    {
      headline: 'Englisch',
      numberOfLearncards: 11
    }
  ];

useHydrateAtoms([[dataAtom, dummyData]])
// TODO: Implement API call to get data from backend
// TODO: Implement selecting learnset and navigating to learnset screen
  return (
    <ScrollView>
      <H1 size="$9" marginVertical="$3">Deine Learnsets</H1>
      <XStack $sm={{ flexDirection: 'column' }} alignItems="center" space="$3">
        {data.map((topic, index) => (
          <TopicsCard
            key={index}
            animation="bouncy"
            size="$3"
            width={330}
            height={100}
            numberOfLearncards={topic.numberOfLearncards}
            headline={topic.headline}
            padding="$4"
            justifyContent="center"
            onPress={() => { console.log('pressed') }}
          />
        ))}
      </XStack>
      <XStack  flexDirection='column' alignItems='center' padding='$4'>
            <TabNavigator navigation={navigation} value={'topicsOverview'} />
      </XStack>
    </ScrollView>
  );
}
