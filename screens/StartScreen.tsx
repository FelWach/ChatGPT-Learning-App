
import { View } from 'react-native';
import { Button, H2, Image, Text, Input, YStack, TextArea, Input } from 'tamagui';
import { SaveAreaView } from '../components/SafeAreaView';

export default function StartScreen({ navigation }) {

  return (
    <SaveAreaView>
      <YStack space>
        <H2>Learning App</H2>
        <Button onPress={ () => navigation.navigate('Login')}>
            <Text>Login</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Register')} >
          <Text>Register</Text>
        </Button>
        <Button onPress={() => navigation.navigate('LearnSet')} >
          <Text>Learnset</Text>
        </Button>
        <Button onPress={() => navigation.navigate('UserSettings')}>
             <Text>User Settings</Text>
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
        <Button onPress={ () => navigation.navigate('Configurator')}>
             <Text>Configurator</Text>
        </Button>
      </YStack>
    </SaveAreaView>
  )
}