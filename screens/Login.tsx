import { Button, H2, Text, Input, XStack, View, YStack } from 'tamagui';
import { useAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { LoginProps } from '../api/types';
import { login } from '../api/api';
import { useEffect, useState } from 'react';
import { SafeAreaView } from '../components/SafeAreaView';
import { useForm, Controller } from 'react-hook-form';


type FormData = {
  usernameOrEmail: string;
  password: string;
};

export default function Login({ navigation }) {
  const { control, handleSubmit, getValues, reset, formState: { errors, isValid } } = useForm<FormData>({
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

      reset();
      
      console.log("User in Login: ");
      console.log(user);

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
    <SafeAreaView>
      <View marginHorizontal="$3">
        <H2>Welcome back!</H2>
        <XStack>
          <Text marginTop="$2" marginBottom="$5">
            Login below or </Text>
          <Text
            onPress={() => {
              navigation.navigate('Register');
            }}
            textDecorationLine='underline' marginTop="$2">
            create an account!
          </Text>
        </XStack>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Username or Email is required!',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Username or Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize='none'
            />
          )}
          name="usernameOrEmail"
        />
        <Text marginVertical="$2" marginLeft="$3">{errors.usernameOrEmail?.message}</Text>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Password is required!',
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
        <Text marginVertical="$2" marginLeft="$3">{errors.password?.message}</Text>

        {errorMessage && <Text marginLeft="$3">{errorMessage}</Text>}
        <YStack marginTop="$5" alignItems='center' space>
          <Button
            disabled={!isValid}
            style={{ opacity: isValid ? 1 : 0.7 }}
            onPress={handleSubmit(onSubmit)}
            width="75%"
          >
            Login
          </Button>
          {/*}<Text  color='#52A9FF' textDecorationLine='underline'>Forgot Password?</Text>{*/}
        </YStack>
      </View>
    </SafeAreaView>
  );
};