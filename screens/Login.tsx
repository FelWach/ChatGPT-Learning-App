import React from 'react';
//import { View } from 'react-native';
import { View, Button, H2, Text, Input } from 'tamagui';
import { atom, useAtom } from 'jotai';

// Atoms for username and password
const usernameAtom = atom('');
const passwordAtom = atom('');

export default function Login() {
  // Using Jotai's useAtom hook to get the state and setter for the atoms
  const [username, setUsername] = useAtom(usernameAtom);
  const [password, setPassword] = useAtom(passwordAtom);

  const checkEmpty = (): boolean => {
    if (username === '' || password === '') {
      return true;
    }
    return false;
  }

  const handleLogin = (): void => {
    if (checkEmpty()) {
      alert('Please enter a username and password');
      return;
    }
    console.log('username', username);
    console.log('password', password);
  };

  return (
    <View>
      <H2>Welcome back!</H2>
      <Text>Login below or create an account</Text>
      <Input
        value={username}
        onChangeText={setUsername}
        placeholder={'Username'}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Button onPress={handleLogin}>Sign in</Button>
      <Text>Forgot Password?</Text>
    </View>
  );
};
