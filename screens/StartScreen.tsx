import { Save } from '@tamagui/lucide-icons';
import { Button, H2, Text, View, YStack } from 'tamagui';
import { SaveAreaView } from '../components/SafeAreaView';


export default function StartScreen({ navigation }) {

  return (
    <SaveAreaView>
      <YStack space>
        <H2>Learning App</H2>
        {/*}
        <Image
            source={{ width: 250, height: 200, uri: 'https://en.m.wikipedia.org/wiki/File:React-icon.svg'}}
            width='100%'
            height='100%'
        />
        {*/}
        <Button onPress={() => navigation.navigate('Login')} >
          <Text>Login</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Register')} >
          <Text>Register</Text>
        </Button>
        <Button onPress={() => navigation.navigate('LearnSet')} >
          <Text>Learnset</Text>
        </Button>
      </YStack>
    </SaveAreaView>
  );
};