import { View } from 'react-native';
import { Button, H2, Text, Input } from 'tamagui';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { atom, useAtom } from 'jotai'
import { userIdAtom, usernameOrEmailAtom, passwordAtom } from '../state/atoms'
import axios from 'axios';

//const Tab = createBottomTabNavigator();

export default function Login({ /*route,*/ navigation }) {
  const [usernameOrEmail, setUsernameOrEmail] = useAtom(usernameOrEmailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  //const { usernameParam } = route.params;
  const [id, setId] = useAtom(userIdAtom);

  const checkEmpty = (): boolean => {
    if (usernameOrEmail === '' || password === '') {
      return true;
    }
    return false;
  }

  const handleLogin = async () => {
    if (checkEmpty()) {
      alert('Please enter a username and password');
      return;
    }
    // Handle login logic here
    const data = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://10.0.2.2:3000/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setId(response.data.userId);
    } catch (error) {
      console.error('Error:', error);
      alert('Error during login. Please try again.');
    } finally {
      navigation.navigate('StartScreen');
    }
  };

  return (
    <View>
      <H2>Welcome back!</H2>
      <Text>Login below or create an account</Text>
      <Input
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
        placeholder={'Username'}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        secureTextEntry={true}
      />
      <Button onPress={() => {
        handleLogin()
      }}>
        Sign in
      </Button>
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
