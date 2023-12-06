import { Button, H2, Input, View, XStack, YStack } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import { atom, useAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { SaveAreaView } from '../components/SafeAreaView';
import TabNavigator from '../components/TabNavigator/TabNavigator'

const passwordAtom = atom<string>('');
const editUsernameAtom = atom<boolean>(false);
const editEmailAtom = atom<boolean>(false);
const editPasswordAtom = atom<boolean>(false);

export default function Profile({ navigation }) {

  const [user, setUser] = useAtom(userAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [editUsername, setEditUsername] = useAtom(editUsernameAtom);
  const [editEmail, setEditEmail] = useAtom(editEmailAtom);
  const [editPassword, setEditPassword] = useAtom(editPasswordAtom)

  return (
    <View>
      <SaveAreaView>
        <H2>Your Profile</H2>

        <YStack margin='$8' space>
          <XStack justifyContent='space-evenly' space>
          <Input width='85%'
              value={user.email}
              editable={editUsername}
              onChangeText={(e) => setUser({ ...user, name: value })}
              placeholder={'Email'}
            />            
            <Button width='15%' icon={<Pencil size={18} />} onPress={() => setEditUsername(true)}></Button>
          </XStack>

          <XStack justifyContent='space-evenly' space>
            <Input width='85%'
              value={user.email}
              editable={editEmail}
              onChangeText={(e) => setUser({ ...user, email: e })}
              placeholder={'Email'}
            />
            <Button  width='15%' icon={<Pencil size={18} />} onPress={() => setEditEmail(true)}></Button>
          </XStack>

          <XStack justifyContent='space-evenly' space>
            <Input width='85%'
              value={password}
              editable={editPassword}
              onChangeText={setPassword}
              placeholder={'Password'}
              secureTextEntry={true}
            /><Button  width='15%' icon={<Pencil size={18} />} onPress={() => setEditPassword(true)}></Button>
          </XStack>

          <Button width='100%' marginTop='$10' borderColor='black' onPress={() => navigation.navigate('StartScreen')}>Sign out</Button>
        </YStack>


        <XStack flexDirection='column' alignItems='center' padding='$4'>
          <TabNavigator navigation={navigation} value={'profile'} />
        </XStack>
      </SaveAreaView>
    </View>
  );
};


