import { H1, XStack, YStack, ScrollView, Text } from "tamagui";
import { TopicsCard } from "../../components/TopicCards/TopicsCard";
import { TopicCardProps } from "../../components/TopicCards/types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import TabNavigator from '../../components/TabNavigator/TabNavigator'
import { getUserEntries, getEntries } from '../../api/api'
import { userIdAtom, userEntriesAtom } from '../../state/atoms'
import { useEffect } from 'react'
import { SaveAreaView } from '../../components/SafeAreaView';
import {useWindowDimensions} from 'react-native';

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
                response = await getUserEntries(Number(id));
                if(response.length !== 0){
                    const topics =  await handleTopicCards(response);
                    setTopicCards(topics);
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
    {
        if(topicCards.length == 0){
            return(
                <SaveAreaView>
                    <ScrollView>
                        <YStack justifyContent="space-between" height={useWindowDimensions().height -100} marginVertical="$4">
                           <YStack alignItems="start"  space="$4" marginLeft="$4">
                           <H1 size="$9" color='#52A9FF'>Du hast noch keine Lernsets generiert!</H1>
                              <Text fontSize="$6" color='#52A9FF'>Leg los und kreiere dein erstes Lernset ganz nach deinen Belieben, indem du auf den Add Button klickst.</Text>
                              <Text fontSize="$6" color='#52A9FF' fontWeight='bold'>Viel Spaß!</Text>
                           </YStack>
                           <YStack  alignSelf="center">
                               <TabNavigator navigation={navigation} value={'topicsOverview'} />
                           </YStack>
                        </YStack>
                    </ScrollView>
                </SaveAreaView>
            )
        }
        else {
            return (
                <SaveAreaView>
                  <ScrollView>
                  <YStack justifyContent="space-between" height={useWindowDimensions().height -150} marginVertical="$4">
                    <YStack alignItems="start"  space="$4" marginLeft="$4">
                        <H1 size="$9">Deine Learnsets</H1>
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
                    </YStack>
                  </YStack>
                    <YStack  alignSelf="center">
                         <TabNavigator navigation={navigation} value={'topicsOverview'} />
                    </YStack>
                  </ScrollView>
                </SaveAreaView>
              );
        }

    }
}
