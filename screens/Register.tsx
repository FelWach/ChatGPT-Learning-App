import { Button, H2, Text, Input, YStack } from 'tamagui';
import { SaveAreaView } from "../components/SafeAreaView";
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'


export default function Register({ navigation }) {
  const [username, setUsername] = useAtom(userAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleRegister = () => {
      // Handle register logic here
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

      <Button onPress= { handleRegister, () => { navigation.navigate('Login', { username: "Laura" }); }}>Register</Button>
    </YStack>
    </SaveAreaView>
  );
};