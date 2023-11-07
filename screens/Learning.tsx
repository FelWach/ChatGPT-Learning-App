import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Progress, SizeTokens, YStack, Card, Button} from 'tamagui';

export default function Learning() {

  const [data, setData] = useState([
    {
      ID: 1,
      Q: "What is the capital of France?",
      A: "Paris"
    },
    {
      ID: 2,
      Q: "What is the capital of Austria?",
      A: "Vienna"
    },
    {
      ID: 3,
      Q: "What is the capital of Germany?",
      A: "Berlin"
    }
  ]);
  const [size, setSize] = useState(4)
  const [progress, setProgress] = useState(0)
  const sizeProp = `$${size}` as SizeTokens

  const [currID, setCurrID]= useState(data[0].ID);
  const [currQ, setCurrQ] = useState(data[0].Q);
  const [currA, setCurrA] = useState(data[0].A);

  const [isFront, setIsFront] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
      /*async function fetchData() {
        const response = await fetch('http://localhost:3000/main');
        const data = await response.json();
        setData(data);
      }
      fetchData();*/
  }, [])

  const handleQuestions = () => {
    setProgress((prev) => (prev + 100/data.length));

    if (currID === data.length) {
      setIsFront(true);
      setIsFinished(true);
      return;
    }

    if (!isFront) {
      setIsFront(true);
    }
    
    if (currID < data.length) {
      setCurrID(currID + 1);
      setCurrQ(data[currID].Q);
      setCurrA(data[currID].A);
    }
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

  const repeatOneQuestion = () => {
    if (isFront) {
      return;
    }
    setIsFront(true);
  }

  const repeatAllQuestions = () => {
    setCurrID(1);
    setCurrQ(data[0].Q);
    setCurrA(data[0].A);
    setProgress(0);
    setIsFront(true);
    setIsFinished(false);
  }
    
  return (
  <View>
    <Text>Frage {currID} von {data.length}</Text>
      <View>
        <Button>
          X
        </Button>

        <View>
          {!isFront ?
              <View>
                <Text onPress={() => handleQuestions()}>Richtig</Text>
                <Text onPress={() => repeatOneQuestion()}>Falsch</Text>
              </View> :
              isFinished &&
              <Text onPress={() => repeatAllQuestions()}>Fragen wiederholen</Text> 
          }
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
        </View>
      </View>
    <Text>Swipe to complete the question</Text>
    <Text>Tap the Card to reveal the answer</Text>
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