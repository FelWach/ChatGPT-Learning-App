import { View } from 'react-native';
import { Button, H2, Text, Input } from 'tamagui';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom } from '../state/atoms'


//const Tab = createBottomTabNavigator();

export default function Login({ /*route,*/ navigation }) {
  const [username, setUsername] = useAtom(userAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  //const { usernameParam } = route.params;

  const checkEmpty = (): boolean => {
    if (username === '' || password === '') {
      return true;
    }
    return false;
  }

  const handleLogin = (): void => {
    if (checkEmpty()) {
      alert('Please enter a username and password');
      return;
    }
    console.log('username', username);
    console.log('password', password);
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
      <Button onPress={handleLogin(), () => navigation.navigate('StartScreen')}>Sign in</Button>
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
