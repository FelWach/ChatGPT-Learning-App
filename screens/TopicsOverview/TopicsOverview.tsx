import { H1, XStack, ScrollView } from "tamagui";
import { TopicsCard } from "../../components/TopicCards/TopicsCard";
import { TopicCardProps } from "../../components/TopicCards/types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import TabNavigator from '../../components/TabNavigator/TabNavigator'
import { getUserEntries, getEntries } from '../../api/api'
import { userIdAtom, userEntriesAtom } from '../../state/atoms'
import { useEffect } from 'react'
import { SaveAreaView } from '../../components/SafeAreaView';

const topicCardAtom = atom<TopicCardProps[]>([]);

export function TopicsOverview({ navigation }) {
  const [userEntries, setUserEntries] = useAtom(userEntriesAtom);
  const [topicCards, setTopicCards] = useAtom(topicCardAtom);
  const [id, setId] = useAtom(userIdAtom);

  // user Entries will be fetched when opening the topicsOverview screen for the first time
  useEffect(() => {
        fetchData();
  }, []);

      const fetchData = async () => {
        try {
            if(userEntries.length == 0){
                const response = await getUserEntries(id);
                if(response.length !== 0){
                    //setUserEntries(response);
                    const topics =  await handleTopicCards(response);
                    setTopicCards(topics);
                }
                else {
                    navigation.navigate('NoLearnsets')
                }
            }
            else {
                console.log('hallo')
                const topics =  await handleTopicCards(userEntries);
                setTopicCards(topics);
            }
        }
        catch(error: any){
            console.log(error.message)
        }
      }

      const handleTopicCards =  async (entries) => {
              const topics: TopicCardProps[] = [];

              for (let i = 0; i < entries.length; i++) {
                    const existingTopicIndex = topics.findIndex((topic) => topic.headline === entries[i].topic);

                    if (existingTopicIndex !== -1) {
                      topics[existingTopicIndex].numberOfLearncards++;
                    } else {
                      topics.push({ headline: entries[i].topic, numberOfLearncards: 1 });
                    }
                  }
              console.log(topics)
              return topics
        };


//useHydrateAtoms([[userEntries, ])

// TODO: Implement selecting learnset and navigating to learnset screen

  return (
    <SaveAreaView>
      <ScrollView>
        <H1 size="$9" marginVertical="$3">Deine Learnsets</H1>
        <XStack $sm={{ flexDirection: 'column' }} alignItems="center" space="$3">

          {topicCards.map((topic, index) => (
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
    </SaveAreaView>
  );
}
