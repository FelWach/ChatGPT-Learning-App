import { Button, H2, Text, Input, YStack } from 'tamagui';
import { SaveAreaView } from "../components/SafeAreaView";
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'
import { addUser } from '../api/api'


export default function Register({ navigation }) {
  const [username, setUsername] = useAtom(userAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);


  const handleRegister = async () => {
  const data = {
       name: username,
       email: email,
       password: password
  };
      const response = await addUser(data);
      console.log(response.status)
  };

  return (
    <SaveAreaView>
    <YStack space>
        <H2>Create an account</H2>
      <Input
        value={username}
        onChangeText={setUsername}
        placeholder={'Username'}
      />
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
      <Input
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        placeholder={'Repeat Password'}
      />

      <Button onPress= {  handleRegister }>Register</Button>
    </YStack>
    </SaveAreaView>
  );
};