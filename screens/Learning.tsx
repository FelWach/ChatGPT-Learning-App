import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Progress, SizeTokens, YStack, Card} from 'tamagui'
import axios from 'axios';

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
    }
  ]);
  const [size, setSize] = useState(4)
  const [progress, setProgress] = useState(20)
  const sizeProp = `$${size}` as SizeTokens

  const [currID, setCurrID]= useState(data[0].ID);
  const [currQ, setCurrQ] = useState(data[0].Q);
  const [currA, setCurrA] = useState(data[0].A);

  const [isFront, setIsFront] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 100)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleQuestion = () => {
    if (!isFront) {
      setIsFront(true);
    }
    setProgress((prev) => (prev + 100/data.length) % 100);

    if (currID < data.length) {
      setCurrID(currID + 1);
      setCurrQ(data[currID].Q);
      setCurrA(data[currID].A);
    }
  }

  const handleCard = () => {
    setIsFront(!isFront);
  }
    
  return (
  <View>
    <Text>Frage {currID} von {data.length}</Text>
      <Text onPress={() => handleQuestion()}>Richtig</Text>
      <Text>Nochmal lernen</Text>
      <View>
        <View>
          <Card elevate size="$20" borderRadius="$10" onPress={() => handleCard()}>
            <Card.Header padded>
            </Card.Header>
            <Card.Footer padded>

            </Card.Footer>
            <Card.Background>
              <Text style={styles.cardText}>
                {isFront ? currQ : currA}
              </Text>
            </Card.Background>
          </Card>
        </View>
      </View>

    <YStack height={60} alignItems="center" space>
      <Progress size={sizeProp} marginTop="$5" value={progress}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </YStack>
    <Text>Swipe to complete the question</Text>
    <Text>Tap the Card to reveal the answer</Text>

  </View>
  );
}

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 180,
  }
})