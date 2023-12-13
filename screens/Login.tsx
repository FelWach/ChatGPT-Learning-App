import { Button, H2, Text, Input, XStack } from 'tamagui';
import { useAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { LoginProps } from '../api/type';
import { login } from '../api/api';
import { useState } from 'react';
import { SaveAreaView } from '../components/SafeAreaView';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  usernameOrEmail: string;
  password: string;
};

export default function Login({ navigation }) {

  const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [user, setUser] = useAtom(userAtom);

  const onSubmit = async (data: any) => {

    const userData: LoginProps = {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
    };

    try {
      const response = await login(userData);
      setUser({
        id: response.userId,
        name: response.name,
        email: response.email,
      })
      navigation.navigate('TopicsOverview');
    } catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during login.');
      }
    }
  }

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

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Username or email is required',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username or email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize='none'
          />
        )}
        name="usernameOrEmail"
      />
      <Text>{errors.usernameOrEmail?.message}</Text>

      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required',
          },
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
      <Text>{errors.password?.message}</Text>

      {errorMessage && <Text>{errorMessage}</Text>}

      <Button
        disabled={!isValid}
        style={{ opacity: isValid ? 1 : 0.7 }}
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
      <Text>Forgot Password?</Text>
    </SaveAreaView>
  );
};
