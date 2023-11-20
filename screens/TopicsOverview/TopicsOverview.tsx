import { H1, XStack, ScrollView } from "tamagui";
import { TopicsCard } from "../../components/TopicCards/TopicsCard";
import { TopicCardProps } from "../../components/TopicCards/types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import TabNavigator from '../../components/TabNavigator/TabNavigator'
import { getUserEntries } from '../../api/api'
import { userIdAtom, userEntriesAtom } from '../../state/atoms'
import { useEffect } from 'react'

const topicsAtom = atom<TopicCardProps[]>([]);

export function TopicsOverview({ navigation }) {

  const [userEntries, setUserEntries] = useAtom(userEntriesAtom);
  //const [topics, setTopics] = useAtom(topicsAtom);
  const [data, setData ] = useAtom(topicsAtom)

  useEffect(async () => {
       const response = await getUserEntries(userIdAtom);
       setUserEntries
  }, [userEntries]);

  //useHydrateAtoms([[userEntries, ])


    const handleTopics = () => {
        for (i= 0; i < userEntries.length; i++) {
        if(topics.length > 0) {
        topics.map((topic) => (
            if(topic.headline == userEntries[0][topic]){
                topic.numberOfLearncards++
            }
            else {
                setTopics(topics, ...{headline: userEntries[0][topic], numberOfLearncards: 1})
            }

        ))
       }
}
    };


// TODO: Implement API call to get data from backend


// TODO: Implement selecting learnset and navigating to learnset screen


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
