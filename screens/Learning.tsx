import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Progress, SizeTokens, Paragraph, Button, YStack, Slider, XStack } from 'tamagui'
import axios from 'axios';

export default function Learning() {

  const [data, setData] = useState([
    {
      Q: "What is the capital of France?",
      A: "Paris"
    },
    {
      Q: "What is the capital of Austria?",
      A: "Vienna"
    }
  ]);
  const [size, setSize] = useState(4)
  const [progress, setProgress] = useState(20)
  const sizeProp = `$${size}` as SizeTokens


  useEffect(() => {
    const timer = setTimeout(() => setProgress(0), 100)
    return () => {
      clearTimeout(timer)
    }
  }, [])



    
  return (
  <View>
    <Text>Learning</Text>
    <Text onPress={() => setProgress((prev) => (prev + 100/data.length) % 100)}>Richtig</Text>
    <Text>Nochmal lernen</Text>

    <YStack height={60} alignItems="center" space>
      <Paragraph height={30} opacity={0.5}>
        Size: {size}
      </Paragraph>
      <Progress size={sizeProp} value={progress}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    </YStack>
    <Button size="$2" onPress={() => setProgress((prev) => (prev + 100/data.length) % 100)}>
      Load
    </Button>
    <Text>Swipe to complete the question</Text>
    <Text>Tap the Card to reveal the answer</Text>

  </View>
  );
}
