import React, { useState } from 'react';
import { Button, H2, Text, Input, YStack } from 'tamagui';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleRegister = () => {
      // Handle register logic here
  };

  return (
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
  );
};