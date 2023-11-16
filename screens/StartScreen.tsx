import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, H2, Image, Text, Input } from 'tamagui';

export default function StartScreen({ navigation }) {

  return (
    <View>
        <H2>Learning App</H2>
        {/*}
        <Image
            source={{ width: 250, height: 200, uri: 'https://en.m.wikipedia.org/wiki/File:React-icon.svg'}}
            width='100%'
            height='100%'
        />
        {*/}

        <Button onPress={ () => navigation.navigate('Login')}>
            <Text>Login</Text>
        </Button>
        <Button onPress={ () => navigation.navigate('Register')}>
             <Text>Register</Text>
        </Button>
    </View>
  );
};