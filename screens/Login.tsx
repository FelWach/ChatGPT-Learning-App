import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, H2, Text, Input } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Register from './Register.tsx'

//const Tab = createBottomTabNavigator();

export default function Login({ /*route,*/ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const { usernameParam } = route.params;

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
      <Button onPress={handleLogin, () =>navigation.navigate('StartScreen')}>Sign in</Button>
      <Text>Forgot Password?</Text>

{/*}
      <Tab.Navigator>
            <Tab.Screen name="LearnSet" component={Register} />
            <Tab.Screen name="Profile" component={Register} />
          </Tab.Navigator>
{*/}

    </View>
  );
};