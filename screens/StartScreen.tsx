import { View } from 'react-native';
import { Button, H2, Image, Text, Input } from 'tamagui';
import { useAtom } from 'jotai'
import { userIdAtom } from '../state/atoms'

export default function StartScreen({ navigation }) {

     const [id, setId] = useAtom(userIdAtom);

     return (
          <View>
               <H2>Learning App</H2>
               <H2>id: {id}</H2>
               <Button onPress={() => navigation.navigate('Login')}>
                    <Text>Login</Text>
               </Button>
               <Button onPress={() => navigation.navigate('Register')}>
                    <Text>Register</Text>
               </Button>
               <Button onPress={() => navigation.navigate('LearnSet')}>
                    <Text>Learnset</Text>
               </Button>
               <Button onPress={() => navigation.navigate('TopicsOverview')}>
                    <Text>Topics Overview</Text>
               </Button>
          </View>
     )
}