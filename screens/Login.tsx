import { View } from 'react-native';
import { Button, H2, Text, Input, YStack } from 'tamagui';
import { atom, useAtom } from 'jotai'
import { userIdAtom } from '../state/atoms'
import axios from 'axios';

export const usernameOrEmailAtom = atom<string>('');
export const passwordAtom = atom<string>('');
const errorAtom = atom<string>('');

export default function Login({ /*route,*/ navigation }) {
  const [usernameOrEmail, setUsernameOrEmail] = useAtom(usernameOrEmailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [id, setId] = useAtom(userIdAtom);

  const [error, setError] = useAtom(errorAtom);

  const checkEmpty = (): boolean => {
    if (usernameOrEmail === '' || password === '') {
      return true;
    }
    return false;
  }

  const handleLogin = async () => {
    if (checkEmpty()) {
      setError('Please fill in all fields.');
      return;
    }
    // Handle login logic here
    const data = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setId(response.data.userId);
      navigation.navigate('TopicsOverview');
    } catch (error) {
      console.error('Error:', error);
      setError(error.response.data.message);
    }
  };

  return (
    <YStack space>
      <H2>Welcome back!</H2>
      <Text>Login below or create an account</Text>
      <Input
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        placeholder={'Username'}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      {error !== '' && <Text>{error}</Text>}
      <Button onPress={() => {
        handleLogin()
      }}>
        Sign in
      </Button>
      <Text>Forgot Password?</Text>
    </YStack>
  );
};
