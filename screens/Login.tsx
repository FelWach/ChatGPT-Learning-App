import { Button, H2, Text, Input, XStack } from 'tamagui';
import { atom, useAtom } from 'jotai'
import { userIdAtom } from '../state/atoms'
import { LoginProps } from '../api/type';
import { login } from '../api/api';
import { useEffect } from 'react';
import { SaveAreaView } from '../components/SafeAreaView';

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
    const data: LoginProps = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    try {
      const response = await login(data);
      // Handle success
      setId(response.userId);
      console.log('id: ', response.userId);
      setUsernameOrEmail('');
      setPassword('');
      navigation.navigate('TopicsOverview');
    } catch (error: any) {
      setError('Invalid username, email or password.');
    }
  };

  return (
    <SaveAreaView>
      <H2>Welcome back!</H2>
      <XStack>
        <Text
          style={{ marginBottom: 10 }}>
          Login below or </Text>
        <Text
          onPress={() => {
            navigation.navigate('Register');
          }}
          style={{ color: 'blue' }}>
          create an account
        </Text>
      </XStack>

      <Input
        value={usernameOrEmail}
        onChangeText={(e) => {
          setError('');
          setUsernameOrEmail(e);
        }}
        placeholder={'Username'}
        autoCapitalize='none'
        style={{ marginBottom: 10 }}
      />

      <Input
        value={password}
        onChangeText={(e) => {
          setPassword(e);
          setError('');
        }}
        placeholder={'Password'}
        secureTextEntry={true}
        autoCapitalize='none'
        style={{ marginBottom: 10 }}
      />

      {error !== '' && <Text style={{ marginBottom: 10 }}>{error}</Text>}

      <Button
        disabled={!isValid}
        onPress={() => {
          handleLogin()
        }}>
        Sign in
      </Button>
      <Text>Forgot Password?</Text>
    </SaveAreaView>
  );
};
