import React, { useState } from 'react';
import { Button, H2, Input, Text, View, YStack } from 'tamagui';
import { SafeAreaView } from '../components/SafeAreaView';
import { UserProps } from '../api/types';
import { register } from '../api/api';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Register({ navigation }) {

  const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (data: any) => {

    const userData: UserProps = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await register(userData);
      navigation.navigate('Login');
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during registration.');
      }
    }
  }

  return (
    <SafeAreaView>
      <View marginHorizontal="$3">
        <H2>Create an account</H2>
        <YStack marginTop="$5">
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Name is required!',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
              />
            )}
            name="name"            
          />
          <Text marginVertical="$2" marginLeft="$3">{errors.name?.message}</Text>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Email is required!',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email!',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
              />
            )}
            name="email"
          />
          <Text marginVertical="$2" marginLeft="$3">{errors.email?.message}</Text>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Password is required!',
              },
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters!',
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                secureTextEntry={true}
              />
            )}
            name="password"
          />
          <Text marginVertical="$2" marginLeft="$3">{errors.password?.message}</Text>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Please confirm your password.',
              },
              validate: value =>
                value === getValues('password') || 'The passwords do not match!',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirm password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                secureTextEntry={true}
              />
            )}
            name="repeatPassword"
          />
          <Text marginVertical="$2" marginLeft="$3">{errors.repeatPassword?.message}</Text>

          {errorMessage && <Text marginLeft="$3">{errorMessage}</Text>}

          <Button
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.7 }}
            onPress={handleSubmit(onSubmit)}
            width="75%"
            alignSelf='center'
            marginTop="$5"
            >
            Register
          </Button>
        </YStack>
      </View>
    </SafeAreaView>
  );
};

