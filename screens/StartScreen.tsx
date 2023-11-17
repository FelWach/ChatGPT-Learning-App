import { View } from 'react-native';
import { Button, H2, Image, Text, Input } from 'tamagui';

export default function StartScreen({ navigation }) {

  return (
    <View>
        <H2>Learning App</H2>
        <Button onPress={ () => navigation.navigate('Login')}>
            <Text>Login</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Register')}>
             <Text>Register</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('LearnSet')}>
             <Text>Learnset</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Profile')}>
             <Text>Profile</Text>
        </Button>
    </View>
  )
}