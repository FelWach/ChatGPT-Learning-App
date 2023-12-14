import { Button, H2, Input, View, XStack, YStack, Text } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import { useRef } from 'react';
import { atom, useAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { SaveAreaView } from '../components/SafeAreaView';
import { useWindowDimensions } from 'react-native';
import { updateUser } from '../api/api';
import { UpdatedUserProps } from '../api/type';
import TabNavigator from '../components/TabNavigator/TabNavigator'
import { useForm, Controller } from 'react-hook-form';

const passwordAtom = atom<string>('');
const editUsernameAtom = atom<boolean>(false);
const editEmailAtom = atom<boolean>(false);
const editPasswordAtom = atom<boolean>(false);
const errorAtom = atom<string>('');

type FormData = {
  username: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordRepeat: string;
};

export default function Profile({ navigation }) {

  const { control, handleSubmit, getValues, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [user, setUser] = useAtom(userAtom);
  const [password, setPassword] = useAtom(passwordAtom);  
  const [editUsername, setEditUsername] = useAtom(editUsernameAtom);
  const [editEmail, setEditEmail] = useAtom(editEmailAtom);
  const [editPassword, setEditPassword] = useAtom(editPasswordAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorAtom);

  const onSubmit = async (data: any) => {

    const updateUserData : UpdatedUserProps = {
      name: data.name,
      email: data.email,
      password: data.password,
      oldPassword: data.oldPassword
    }
    try {
      const response = await updateUser(user.id, updateUserData);
      navigation.navigate('Login');

      // TODO: setUser

      console.log(response.message)
      console.log(response.user)
      console.log("hy")
    }
    catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during update.');
      }
    }
  }


const handleEditUsername = () => {
  editUsername ? setEditUsername(false) : setEditUsername(true);
};

const handleEditEmail = () => {
  editEmail ? setEditEmail(false) : setEditEmail(true);
};

const handleEditPassword = () => {
  editPassword ? setEditPassword(false) : setEditPassword(true);
};

return (
  <View>
    <SaveAreaView>
      <YStack justifyContent="space-between" alignItems="flex-start" space="$5" margin="$5" zIndex='$1'>
        <H2>Your Profile</H2>

        <XStack justifyContent='space-evenly' space>
          <Controller
            control={control}
            rules={{
              required: {
                value: false,
                message: 'Name is required',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input width='80%'
                placeholder={user.name}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                editable={editUsername}
                color={editUsername ? 'white' : '#455468'}
              />
            )}
            name="username"
          />
          <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditUsername()}></Button>
        </XStack>
        {errors.username?.message && <Text>{errors.username?.message}</Text> }

        <XStack justifyContent='space-evenly' space>
          <Controller
              control={control}
              rules={{
                required: {
                  value: false,
                  message: 'Email is required',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input width='80%'
                  placeholder={user.email}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value= {value}
                  autoCapitalize='none'
                  editable={editEmail}
                  color={editEmail ? 'white' : '#455468'}
                />            
                )}
                name="email"
              />
          <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditEmail()}></Button>
        </XStack>
        { errors.email?.message && <Text>{errors.email?.message}</Text> }

        <XStack justifyContent='space-evenly' space>
          <Input width='80%'
            value={password}
            editable={editPassword}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
          /><Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditPassword()}></Button>
        </XStack>

        {editPassword && 
          <YStack justifyContent='space-evenly' space width='100%'>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input 
                  placeholder="New password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  />
              )}
              name="password"
              />
            {errors.password?.message && <Text>{errors.password?.message}</Text> }
                
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Please confirm your new password',
                },
                validate: value =>
                  value === getValues('password') || 'The passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input 
                  placeholder="Confirm new password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  />
              )}
              name="passwordRepeat"
              />
          </YStack>
        }

        {errorMessage && <Text>{errorMessage}</Text>}

        <Button 
          width='100%' 
          marginTop='$3' 
          borderColor='black' 
          disabled={!isValid}
          style={{ opacity: isValid ? 1 : 0.7 }}
          onPress={() => handleSubmit(onSubmit)}>
            Save
        </Button>
        <Button 
          width='100%' 
          borderColor='black' 
          onPress={() => navigation.navigate('StartScreen')}>
            Sign out
        </Button>
      </YStack>


      <YStack alignSelf="center" height={useWindowDimensions().height - 100} justifyContent="flex-end" position="absolute">
        <TabNavigator navigation={navigation} value={'profile'} />
      </YStack>
    </SaveAreaView>
  </View>
);
};


