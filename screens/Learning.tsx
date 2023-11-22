import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Progress, SizeTokens, YStack, Card, Button} from 'tamagui';
import axios from 'axios';

import { useAtom } from 'jotai';
import { atom } from 'jotai';

// atom states 
const dataAtom = atom([]);
const currIDAtom = atom(0);
const currQAtom = atom("");
const currAAtom = atom("");
const dataLengthAtom = atom(0);
const numberQAtom = atom(1);
const progressAtom = atom(0);
const isFrontAtom = atom(true);
const isFinishedAtom = atom(false);


export default function Learning({ navigation}) {

  type DataType = { id: number; Q: string; A: string };
  const [data, setData] = useAtom(dataAtom);
  const [currID, setCurrID]= useAtom(currIDAtom);
  const [currQ, setCurrQ] = useAtom(currQAtom);
  const [currA, setCurrA] = useAtom(currAAtom);
  const [dataLength, setDataLength] = useAtom(dataLengthAtom);
  const [numberQ, setNumberQ] = useAtom(numberQAtom);

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
      const response = await axios.get('http://10.0.2.2:3000/entries');
      setData(response.data);
      setDataLength(response.data.length);
      setCurrID(response.data[0].id);
      setCurrQ(response.data[0].Q);
      setCurrA(response.data[0].A);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const leftSwipeActions = () => {
    if (isFinished) {
      return;
    }
    return (
      <Card elevate size="$20" borderRadius="$10" style={{backgroundColor: "red"}}>
        <Card.Header padded>
        </Card.Header>
        <Card.Footer padded>

        </Card.Footer>
        <Card.Background alignItems="center">
          <Text style={styles.cardText} >
            Wrong
          </Text>
        </Card.Background>
      </Card>
          )
  }

  const rightSwipeActions = () => {
    if (isFinished) {
      return;
    }
    return (
      <Card elevate size="$20" borderRadius="$10" style={{backgroundColor: "green"}}>
        <Card.Header padded>
        </Card.Header>
        <Card.Footer padded>

        </Card.Footer>
        <Card.Background alignItems="center">
          <Text style={styles.cardText} >
            Correct
          </Text>
        </Card.Background>
      </Card>
    )
  }
    
  return (
  <View>
    <Text>Frage {numberQ} von {data.length}</Text>
      <View>
        <Button>
          X
        </Button>

        <View>
          {
            isFinished &&
            <Text onPress={() => repeatAllQuestions()}>Fragen wiederholen</Text> 
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
                <Text style={styles.cardText}>
                  {isFinished ? "You're done!" : 
                    isFront ? currQ : currA
                  }
                </Text>
              </Card.Background>
            </Card>
          </Swipeable>
        </View>
      </View>
      {!isFinished && isFront ?
        <Text>Tap the Card to reveal the answer</Text>
        :
        <Text>Swipe to complete the question</Text>
      }
    <YStack height={60} alignItems="center" space>
      <Progress size={sizeProp} marginTop="$5" value={progress}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </YStack>

  </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})