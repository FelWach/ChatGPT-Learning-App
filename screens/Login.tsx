import { Button, H2, Text, Input, YStack } from 'tamagui';
import { atom, useAtom } from 'jotai'
import { userIdAtom } from '../state/atoms'
import axios from 'axios';
import { useEffect } from 'react';

const usernameOrEmailAtom = atom<string>('');
const passwordAtom = atom<string>('');
const isValidAtom = atom<boolean>(false);
const errorAtom = atom<string>('');

export default function Login({ /*route,*/ navigation }) {
  const [usernameOrEmail, setUsernameOrEmail] = useAtom(usernameOrEmailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [id, setId] = useAtom(userIdAtom);

  const [error, setError] = useAtom(errorAtom);
  const [isValid, setIsValid] = useAtom(isValidAtom);

  useEffect(() => {
    if (usernameOrEmail === '' || password === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [usernameOrEmail, password])

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
    } catch (error: any) {
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
        onChangeText={(e) => {
          setError('');
          setUsernameOrEmail(e);
        }}
        placeholder={'Username'}
      />
      <Input
        value={password}
        onChangeText={(e) => {
          setPassword(e);
          setError('');
        }}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      {error !== '' && <Text>{error}</Text>}
      <Button
        disabled={!isValid}
        onPress={() => {
          handleLogin()
        }}>
        Sign in
      </Button>
      <Text>Forgot Password?</Text>
    </YStack>
  );
};
