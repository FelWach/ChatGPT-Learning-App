import React from 'react';
import { View } from 'react-native';
import { Button, H2, Input } from 'tamagui';
import { atom, useAtom } from 'jotai';
import axios from 'axios';

const usernameAtom = atom('');
const emailAtom = atom('');
const passwordAtom = atom('');
const repeatPasswordAtom = atom('');

export default function Register({ navigation }) {
  const [username, setUsername] = useAtom(usernameAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);

  const checkEmptyFields = () => {
    if (username === '' || email === '' || password === '' || repeatPassword === '') {
      return true;
    }
    return false;
  }

  const handleRegister = async () => {
    if (checkEmptyFields()) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/addUser',
        {
          name: username,
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error during registration. Please try again.');
    }
  };

  return (
    <View>
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
        secureTextEntry={true}
      />
      <Button onPress={() => {
        handleRegister();
      }}>
        Register
      </Button>
    </View>
  );
};
