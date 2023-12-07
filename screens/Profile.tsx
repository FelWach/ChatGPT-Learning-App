import { Button, H2, Input, View, XStack } from 'tamagui';
import { atom, useAtom  } from 'jotai'
import { userAtom } from '../state/atoms'
import TabNavigator from '../components/TabNavigator/TabNavigator'

const passwordAtom = atom<string>('');

export default function Profile({ navigation }){
  
  const [user, setUser] = useAtom(userAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  return (
    <View>
        <H2>Your Profile</H2>

        <XStack flexDirection='column' margin='$8' space>
          <Input
            value={user.email}
            onChangeText={(e) => setUser({...user, email: e})}
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
            <TabNavigator navigation={navigation} value={'profile'} />
        </XStack>
    </View>
  );
};


