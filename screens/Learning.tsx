import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { SaveAreaView } from "../components/SafeAreaView";
import { Progress, SizeTokens, YStack, Card, Text, View, XStack} from 'tamagui';
import { getEntriesWithTopic } from '../api/api';

import { useAtom } from 'jotai';
import { atom } from 'jotai';

// atom states 
type DataType = { id: number; Q: string; A: string };
const dataAtom = atom<DataType[]>([]);
const currIDAtom = atom(0);
const currQAtom = atom("");
const currAAtom = atom("");
const dataLengthAtom = atom(0);
const numberQAtom = atom(1);
const progressAtom = atom(0);
const isFrontAtom = atom(true);
const isFinishedAtom = atom(false);
const correctAnswersAtom = atom(0);

export default function Learning({ navigation }) {

  const [data, setData] = useAtom(dataAtom);
  const [currID, setCurrID]= useAtom(currIDAtom);
  const [currQ, setCurrQ] = useAtom(currQAtom);
  const [currA, setCurrA] = useAtom(currAAtom);
  const [dataLength, setDataLength] = useAtom(dataLengthAtom);
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
      const response = await getEntriesWithTopic(1, 'avocado');
      
      if (response && response.data.length != 0) {
        setData(response.data);
        setDataLength(response.data.length);
        setCurrID(response.data[0].id);
        setCurrQ(response.data[0].Q);
        setCurrA(response.data[0].A);
      }
  };

  const handleSwipeableOpen = (direction: string) => {
    if (swipeableRef) {
      swipeableRef.close();
    }

    if (direction === 'right') {
      repeatOneQuestion();
    } else {
      nextQuestion();
    }
  }

  const nextQuestion = () => {
    setProgress((prev) => (prev + 100/dataLength));

    if (numberQ === data.length) {
      setIsFront(true);
      setIsFinished(true);
      return;
    }

    if (!isFront) {
      setIsFront(true);
    }
    
    if (numberQ < data.length) {
      setNumberQ(numberQ + 1);
      setCurrID(currID + 1);
      setCurrQ(data[numberQ].Q);
      setCurrA(data[numberQ].A);
      if (numberQ < dataLength) {
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
  }

  const repeatOneQuestion = () => {
    data.push({id: currID, Q: currQ, A: currA});
    data.splice(currID - 1, 1);
    
    if (numberQ < data.length) {
      setNumberQ(numberQ + 1);
      setCurrID(currID + 1);
      setCurrQ(data[numberQ].Q);
      setCurrA(data[numberQ].A);
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
      <Card elevate size="$20" borderRadius="$10" style={{backgroundColor: "#901C1C"}}>
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

  const leftSwipeActions = () => {
    if (isFinished) {
      return;
    }
    return (
      <Card elevate size="$20" borderRadius="$10" style={{backgroundColor: "#0A9632"}}>
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
    
  return (
    <SaveAreaView>
    <View>
      <Text textAlign='center' margin='$3'>Question {numberQ} from {data.length}</Text>
        <View>
          {
            isFinished ?
            <Text textAlign='center' margin='$3' onPress={() => repeatAllQuestions()}>Fragen wiederholen</Text> 
            :
            <XStack>
              <Text textAlign='left' margin='$3' width={170} onPress={() => nextQuestion()}>Correct</Text>
              <Text textAlign='right' margin='$3' width={170} onPress={() => repeatOneQuestion()}>Wrong</Text>
            </XStack>
          }
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
                  {isFinished ? 
                    (
                      "You're done!" + "\n"
                      + "You answered " + correctAnswers + " out of " + dataLength + " questions correctly on your first attempt!"
                    ) : 
                    isFront ? currQ : currA
                  }
                </Text>
                </View>
              </Card.Background>
            </Card>
          </Swipeable>
        </View>
        {!isFinished &&
        <View> 
          {isFront ?
            <Text textAlign='center' margin='$3'>Tap the Card to reveal the answer</Text>
            :
            <Text textAlign='center' margin='$3'>Swipe to complete the question</Text>
          }
        </View>
        }
      <YStack height={60} alignItems="center" space>
        <Progress size={sizeProp} marginTop="$5" value={progress}>
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </YStack>
    </View>
    </SaveAreaView>
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