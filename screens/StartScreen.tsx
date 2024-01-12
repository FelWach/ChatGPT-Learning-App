import { Button, H2, Text, View, YStack, TextArea, Input } from 'tamagui';
import { SafeAreaView } from '../components/SafeAreaView';


export default function StartScreen({ navigation }) {

  return (
    <SafeAreaView>
      <YStack>
        <H2 alignSelf='center'>Learning App</H2>        
        <YStack marginTop='$10' space="$5"> 
          <Button onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
          <Button onPress={() => navigation.navigate('Register')} >
            <Text>Register</Text>
          </Button>         
        </YStack>       
      </YStack>
    </SafeAreaView>
  )
}