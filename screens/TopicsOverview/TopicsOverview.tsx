import { H1, XStack, ScrollView } from "tamagui";
import { TopicsCard } from "../../components/TopicCards/TopicsCard";
import { TopicCardProps } from "../../components/TopicCards/types";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import TabNavigator from '../../components/TabNavigator/TabNavigator'
import { getUserEntries, getEntries } from '../../api/api'
import { userIdAtom, userEntriesAtom } from '../../state/atoms'
import { useEffect } from 'react'

const topicCardAtom = atom<TopicCardProps>([]);

export function TopicsOverview({ navigation }) {
  const [userEntries, setUserEntries] = useAtom(userEntriesAtom);
  const [topicCards, setTopicCards] = useAtom(topicCardAtom);

    // user Entries will be fetched when opening the topicsOverview screen for the first time
  useEffect(() => {
        fetchData();
  }, []);

      const fetchData = async () => {
        try {
            //const response = await getUserEntries(userIdAtom);
            const response = await getEntries();
            console.log(response)

            if(response.length !== 0){
                setUserEntries(response);

                const topics =  await handleTopicCards();
                setTopicCards(topics)
            }
            else {
                navigation.navigate('NoLearnsets')
            }
        }
        catch(error: any){
            console.log(error.message)
        }
      }

      const handleTopicCards =  async () => {
              const topics: TopicCardProps[] = [];
              const topicExists: boolean = false;

              if (topics.length == 0){
                  topics.push({headline: 'wasser', numberOfLearncards: 0});
              }
              for (i= 0; i < userEntries.length; i++) {
                  for (x= 0; x < topics.length; x++) {
                          if(topics[x].headline == userEntries[i].topic){
                              topicExists = true;
                              topics[x].numberOfLearncards++
                              return
                          }
                          else {
                              topicExists = false;
                          }
                  }
                  if(!topicExists){
                      topics.push({headline: userEntries[i].topic, numberOfLearncards: 1})
                  }
              }
              return topics
        };



  //useHydrateAtoms([[userEntries, ])


// TODO: Implement selecting learnset and navigating to learnset screen

/*
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
*/

  return (

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

  );
}
