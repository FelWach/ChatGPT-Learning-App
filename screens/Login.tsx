import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, H2, Text, Input } from 'tamagui';

export default function Login({ /*route,*/ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
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