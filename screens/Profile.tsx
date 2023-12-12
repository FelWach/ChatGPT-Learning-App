import { Button, H2, Input, View, XStack, YStack } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import { useRef } from 'react';
import { atom, useAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { SaveAreaView } from '../components/SafeAreaView';
import { useWindowDimensions } from 'react-native';
import { updateUser } from '../api/api';
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
  const inputUsername = useRef();

  const saveUserData = async () => {
    const data = {
      name: user.name,
      email: user.email,
      //password: password,
      //oldPassword:
    }
    try {
      const response = await updateUser(user.id, data);
      console.log(response.message)
    }
    catch (error: any) {
      console.log(error.message + '! ' + error.error)
    }
  }


const handleEditUsername = () => {
  if (editUsername) {
    setEditUsername(false);
  } else {
    setEditUsername(true);
    // TODO: focus text when editUsername = true
    inputUsername.current.focus();
  }
};

const handleEditEmail = () => {
  editEmail ? setEditEmail(false) : setEditEmail(true);
  // TODO: focus text when editEmail = true
};

const handleEditPassword = () => {
  editPassword ? setEditPassword(false) : setEditPassword(true);
  // TODO: focus text when editPassword = true
};

return (
  <View>
    <SaveAreaView>
      <YStack justifyContent="space-between" alignItems="flex-start" space="$5" margin="$5" zIndex='$1'>
        <H2>Your Profile</H2>
        <XStack justifyContent='space-evenly' space>
          <Input width='85%'
            ref={inputUsername}
            value={user.name}
            editable={editUsername}
            onChangeText={(e) => setUser({ ...user, name: value })}
            placeholder={'Email'}
          />
          <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditUsername()}></Button>
        </XStack>

        <XStack justifyContent='space-evenly' space>
          <Input width='85%'
            value={user.email}
            editable={editEmail}
            onChangeText={(e) => setUser({ ...user, email: e })}
            placeholder={'Email'}
          />
          <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditEmail()}></Button>
        </XStack>

        <XStack justifyContent='space-evenly' space>
          <Input width='85%'
            value={password}
            editable={editPassword}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
          /><Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditPassword()}></Button>
        </XStack>
        <Button width='100%' marginTop='$3' borderColor='black' onPress={() => saveUserData()}>Save</Button>
        <Button width='100%' borderColor='black' onPress={() => navigation.navigate('StartScreen')}>Sign out</Button>
      </YStack>


      <YStack alignSelf="center" height={useWindowDimensions().height - 100} justifyContent="flex-end" position="absolute">
        <TabNavigator navigation={navigation} value={'profile'} />
      </YStack>
    </SaveAreaView>
  </View>
);
};


