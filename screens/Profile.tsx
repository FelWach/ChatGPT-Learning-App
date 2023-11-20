import { Button, H2, Input, View, XStack } from 'tamagui';
import { useAtom  } from 'jotai'
import { emailAtom, passwordAtom } from '../state/atoms'
import TabNavigator from '../components/TabNavigator/TabNavigator'


export default function Profile({ navigation }){
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);


  return (
    <View>
        <H2>Your Profile</H2>

        <XStack flexDirection='column' margin='$8' space>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={'Email'}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
          />
          <Button borderColor='black' onPress={() => navigation.navigate('StartScreen')}>Sign out</Button>
          </XStack>


        <XStack  flexDirection='column' alignItems='center' padding='$4'>
            <TabNavigator navigation={navigation} value={'topicsOverview'} />
        </XStack>
    </View>
  );
};


