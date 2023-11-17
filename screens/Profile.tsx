import { Button, H2, Text, Input, SizableText, Tabs, Trigger, View, XStack, YStack } from 'tamagui';
import { User,  BookOpen } from '@tamagui/lucide-icons'
import { useAtom  } from 'jotai'
import { emailAtom, passwordAtom } from '../state/atoms'


export default function Profile({ navigation }){
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);


  return (
    <View>

      <H2>Your Profile</H2>

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
      <Button onPress={() => navigation.navigate('StartScreen')}>Sign out</Button>

      <Tabs value='topicsOverview'  flexDirection='row' justifyContent='center'>
         <Tabs.List>
          <Tabs.Tab value="profile">
              <Button unstyled={true} icon={<User size='$2' />} onPress={  () => navigation.navigate('Profile') } />
          </Tabs.Tab>
          <Tabs.Tab value="topicsOverview">
              <Button unstyled={true} icon={<BookOpen size='$2' />} onPress={ () => navigation.navigate('TopicsOverview') } />
          </Tabs.Tab>
         </Tabs.List>
      </Tabs>
    </View>
  );
};


