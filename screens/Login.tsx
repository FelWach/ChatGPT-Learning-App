import React, { useState } from 'react';
import { Button, H2, Text, Input, YStack } from 'tamagui';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


//const Tab = createBottomTabNavigator();

export default function Login({ /*route,*/ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const { usernameParam } = route.params;

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <YStack space>
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
      <Button onPress={handleLogin, () =>navigation.navigate('StartScreen')}>Sign in</Button>
      <Text>Forgot Password?</Text>

{/*}
      <Tab.Navigator>
            <Tab.Screen name="LearnSet" component={Register} />
            <Tab.Screen name="Profile" component={Register} />
          </Tab.Navigator>
{*/}

    </YStack>
  );
};