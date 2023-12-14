import { Button, H2, Text, View, YStack, TextArea, Input } from 'tamagui';
import { SaveAreaView } from '../components/SafeAreaView/SafeAreaView';
import { useWindowDimensions } from 'react-native';

export default function StartScreen({ navigation }) {

  return (
    <SaveAreaView>
      <YStack margin="$5">
        <H2 alignSelf='center'>Learning App</H2>
        <YStack marginTop='$10' space="$5"> 
          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Register')} >
            <Text>Register</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Features')} >
            <Text>Features</Text>
          </Button>
        </YStack>
        {/*}
        <Button onPress={() => navigation.navigate('LearnSet')} >
          <Text>Learnset</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Learning')}>
             <Text>Learning</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('TopicsOverview')}>
             <Text>Topics Overview</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Api')}>
             <Text>Api</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Profile')}>
             <Text>Profile</Text>
        </Button>
  {*/}
      </YStack>
    </SaveAreaView>
  )
}