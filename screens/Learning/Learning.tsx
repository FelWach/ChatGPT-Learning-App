import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Progress, SizeTokens, YStack, Card, Text, View, XStack, Button, H2, H3 } from 'tamagui';
import { useAtom, atom } from 'jotai';
import { questionsAnswersAtom } from '../../state/atoms';
import { Repeat } from '@tamagui/lucide-icons';
import { QuestionsAnswersData } from './types';
import { getEntriesWithTopic } from '../../api/api';
import { SafeAreaView } from "../../components/SafeAreaView";
import { useHeaderHeight } from '@react-navigation/elements';

const currIDAtom = atom(0);
const currQAtom = atom("");
const currAAtom = atom("");
const numberQAtom = atom(1);
const progressAtom = atom(0);
const isFrontAtom = atom(true);
const isFinishedAtom = atom(false);
const correctAnswersAtom = atom(1);

const learningCardAtom = atom<QuestionsAnswersData[]>([]);

export default function Learning({ navigation }) {

  const [questionsAnswers] = useAtom(questionsAnswersAtom);
  const [learningCard, setLearningCard] = useAtom(learningCardAtom);
  const [currID, setCurrID] = useAtom(currIDAtom);
  const [currQ, setCurrQ] = useAtom(currQAtom);
  const [currA, setCurrA] = useAtom(currAAtom);
  const [numberQ, setNumberQ] = useAtom(numberQAtom);
  const [correctAnswers, setCorrectAnswers] = useAtom(correctAnswersAtom);

  let swipeableRef: { close: () => any; } | null = null;

  const size = 4;
  const [progress, setProgress] = useAtom(progressAtom);
  const sizeProp = `$${size}` as SizeTokens

  const [isFront, setIsFront] = useAtom(isFrontAtom);
  const [isFinished, setIsFinished] = useAtom(isFinishedAtom);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const updatedLearningCard = questionsAnswers;
      await setLearningCard([...questionsAnswers]);

      const firstCard = updatedLearningCard[0];

      if (firstCard) {
        setCurrID(Number(firstCard.id));
        setCurrQ(firstCard.Q);
        setCurrA(firstCard.A);
      }
    } catch (error) {
      console.error("Error loading questions:", error.message);
    }
  };


  const handleSwipeableOpen = (direction: string) => {
    if (swipeableRef) {
      swipeableRef.close();
    }

    if (direction === 'right') {
      nextQuestion();
    } else {
      repeatOneQuestion();
    }
  }

  const nextQuestion = () => {
    setProgress((prev) => (prev + 100 / questionsAnswers.length + 1));

    if (numberQ === learningCard.length) {
      setIsFront(true);
      setIsFinished(true);
      return;
    }

    if (!isFront) {
      setIsFront(true);
    }

    if (numberQ < learningCard.length) {
      setNumberQ(numberQ + 1);
      setCurrID(currID + 1);
      setCurrQ(learningCard[numberQ].Q);
      setCurrA(learningCard[numberQ].A);
      if (numberQ < questionsAnswers.length) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }
  }


  const repeatAllQuestions = () => {
    loadQuestions();
    setNumberQ(1);
    setProgress(0);
    setIsFront(true);
    setIsFinished(false);
    setCorrectAnswers(1);
  }

  const repeatOneQuestion = () => {
    learningCard.push({ id: String(currID), Q: currQ, A: currA });

    learningCard.splice(currID - 1, 1);

    if (numberQ < learningCard.length) {
      setNumberQ(numberQ + 1);
      setCurrID(currID + 1);
      setCurrQ(learningCard[numberQ].Q);
      setCurrA(learningCard[numberQ].A);
    }

    if (isFront) {
      return;
    }
    setIsFront(true);
  }

  const handleCard = () => {
    if (isFinished) {
      return;
    }
    if (isFinished && !isFront) {
      return;
    }
    setIsFront(false);
  }

  const rightSwipeActions = () => {
    if (isFinished) {
      return;
    }
    return (
      <Card elevate size="$20" borderRadius="$10" style={{ backgroundColor: "#0A9632" }}>
        <Card.Header padded>
        </Card.Header>
        <Card.Footer padded>

        </Card.Footer>
        <Card.Background alignItems="center">
          <View style={styles.card}>
            <Text style={styles.cardTextSwipe} color={"#26BC51"}>
              Correct
            </Text>
          </View>
        </Card.Background>
      </Card>
    )
  }

  const leftSwipeActions = () => {
    if (isFinished) {
      return;
    }
    return (
      <Card elevate size="$20" borderRadius="$10" style={{ backgroundColor: "#901C1C" }}>
        <Card.Header padded>
        </Card.Header>
        <Card.Footer padded>

        </Card.Footer>
        <Card.Background alignItems="center">
          <View style={styles.card}>
            <Text style={styles.cardTextSwipe} color={"#D74C4C"}>
              Wrong
            </Text>
          </View>
        </Card.Background>
      </Card>
    )
  }

  return (
    <SafeAreaView>
      <View>
        {isFinished ? null :
          <YStack alignItems="center">
            <XStack>
              {numberQ > questionsAnswers.length &&
                <Repeat size={15} color={"#D74C4C"} />
              }
              <Text textAlign='center' margin='$3'>Question {numberQ} from {questionsAnswers.length}</Text>
            </XStack>
            <XStack style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Text style={{ flex: 1, margin: 15 }} onPress={() => nextQuestion()}>Correct</Text>
            </XStack>
          </YStack>
        }
        <View>
          {isFinished ?
            <>
              <H2 textAlign='center'>You're done!</H2>
              <Text textAlign='center' marginVertical='$3'>
                You answered {correctAnswers} out of {questionsAnswers.length} questions correctly!
              </Text>
            </> :
            <Swipeable
              ref={(ref) => (swipeableRef = ref)}
              renderLeftActions={leftSwipeActions}
              renderRightActions={rightSwipeActions}
              onSwipeableOpen={(event) => handleSwipeableOpen(event === 'right' ? 'right' : 'left')}
            >
              <Card elevate size="$20" borderRadius="$10" onPress={() => handleCard()}>
                <Card.Header padded>
                </Card.Header>
                <Card.Footer padded>

                </Card.Footer>
                <Card.Background alignItems="center">
                  <View style={styles.card}>
                    <Text style={isFront ? styles.cardTextQ : styles.cardTextA}>
                      {
                        isFront ? currQ : currA
                      }
                    </Text>
                  </View>
                </Card.Background>
              </Card>
            </Swipeable>
          }
        </View>

        {!isFinished ?
          <View>
            {isFront ?
              <Text textAlign='center' margin='$3'>Tap the Card to reveal the answer</Text>
              :
              <Text textAlign='center' margin='$3'>Swipe to complete the question</Text>
            }
          </View> :
          <Button icon={Repeat} size="$5" variant="outlined" marginVertical="$5" pressStyle={{ borderWidth: 3.5 }} onPress={() => repeatAllQuestions()}>
            <Text>Fragen wiederholen</Text>
          </Button>
        }
        <YStack height={60} alignItems="center" space>
          <Progress size={sizeProp} marginTop="$5" value={progress}>
            <Progress.Indicator animation="bouncy" />
          </Progress>
        </YStack>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardTextQ: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  cardTextA: {
    fontSize: 18,
    textAlign: "center",
  },
  cardTextSwipe: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center"
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    padding: 5,
  }
})