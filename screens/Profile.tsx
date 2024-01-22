import { Button, H2, Input, XStack, YStack, Text } from 'tamagui';
import { Pencil } from '@tamagui/lucide-icons';
import React, { useEffect } from 'react';
import { atom, useAtom, useSetAtom } from 'jotai'
import { userAtom } from '../state/atoms'
import { Alert } from 'react-native';
import { updateUser } from '../api/api';
import { UpdatedUserProps } from '../api/types';
import { useForm, Controller } from 'react-hook-form';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import { tabValueAtom } from './TopicsOverview/TopicsOverview';

const editUsernameAtom = atom<boolean>(false);
const editEmailAtom = atom<boolean>(false);
const editOldPasswordAtom = atom<boolean>(false);
const editPasswordRepeatAtom = atom<boolean>(false);
const errorAtom = atom<string>('');

type FormData = {
  username: string;
  email: string;
  oldPassword: string;
  password: string;
  passwordRepeat: string;
};

export default function Profile({ navigation }) {
  const { control, handleSubmit, getValues, setValue, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onBlur',
  });

  const [user, setUser] = useAtom(userAtom);
  const [editUsername, setEditUsername] = useAtom(editUsernameAtom);
  const [editEmail, setEditEmail] = useAtom(editEmailAtom);
  const [editOldPassword, setEditOldPassword] = useAtom(editOldPasswordAtom);
  const [editPasswordRepeat, setEditPasswordRepeat] = useAtom(editPasswordRepeatAtom);
  const [errorMessage, setErrorMessage] = useAtom(errorAtom);
  const [tabValue, setTabValue] = useAtom(tabValueAtom);

  useEffect(() => {
    setValue('username', user.name);
    setValue('email', user.email);
    setValue('oldPassword', '*');
  }, [user]);

  const onSubmit = async (data: any) => {

    const updateUserData: UpdatedUserProps = {
      name: data.username ? data.username : user.name,
      email: data.email ? data.email : user.email,
      oldPassword: data.oldPassword,
      password: data.password,
    }
    try {
      const response = await updateUser(user.id, updateUserData);
      navigation.navigate('Login');
      console.log(response.message)
    }
    catch (error: any) {
      if (error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during update.');
      }
    }
  }

  const signOutUserAlert = () => {
    Alert.alert(
      'Confirm Sign out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => {
            setTabValue('topicsOverview');
            setEditUsername(false);
            setEditEmail(false);
            setEditOldPassword(false);
            navigation.navigate('Login');
            setUser({});
          },
        },
      ],
      { cancelable: false }
    );
  }

  const handleEditUsername = () => {
    editUsername ? setEditUsername(false) : setEditUsername(true);
    editEmail && setEditEmail(false);
    editOldPassword && setEditOldPassword(false);
  };

  const handleEditEmail = () => {
    editEmail ? setEditEmail(false) : setEditEmail(true);
    editUsername && setEditUsername(false);
    editOldPassword && setEditOldPassword(false);
  };

  const handleEditPassword = () => {
    if (errors.password?.message) {
      setEditOldPassword(true);
    }
    editOldPassword ? setEditOldPassword(false) : setEditOldPassword(true);
    editUsername && setEditUsername(false);
    editEmail && setEditEmail(false);
  };

  return (
    <>
      <H2 marginBottom='$5'>Hello {user.name}!</H2>
      <YStack space="$5" zIndex='$1'>
        <XStack space>
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
                placeholder="Name"
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
          {editUsername ? (
            <Button width='15%' theme='active' icon={<Pencil size={18} />} onPress={() => setEditUsername(false)} />
          ) : (
            <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditUsername()} />
          )}

        </XStack>
        {errors.username?.message && <Text marginLeft="$3">{errors.username?.message}</Text>}

        <XStack space>
          <Controller
            control={control}
            rules={{
              required: {
                value: false,
                message: 'Email is required!',
              },
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email!',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input width='80%'
                placeholder="Email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                editable={editEmail}
                color={editEmail ? 'white' : '#455468'}
              />
            )}
            name="email"
          />
          {editEmail ? (
            <Button width='15%' theme='active' icon={<Pencil size={18} />} onPress={() => setEditEmail(false)} />
          ) : (
            <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditEmail()} />
          )}
        </XStack>

        {errors.email?.message && <Text marginLeft="$3">{errors.email?.message}</Text>}

        <XStack space>
          <Controller
            control={control}
            rules={{
              required: {
                value: false,
                message: 'Password is required!',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input width='80%'
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize='none'
                editable={editOldPassword}
                color={editOldPassword ? 'white' : '#455468'}
                secureTextEntry={true}
              />
            )}
            name="oldPassword"
          />
          {editOldPassword ? (
            <Button width='15%' theme='active' icon={<Pencil size={18} />} onPress={() => handleEditPassword()} />
          ) : (
            <Button width='15%' icon={<Pencil size={18} />} onPress={() => handleEditPassword()} />
          )}
        </XStack>

        {errors.oldPassword?.message && <Text marginLeft="$3">{errors.oldPassword?.message}</Text>}

        {editOldPassword &&
          <YStack space="$5" width='100%'>
            <Controller
              control={control}
              rules={{
                required: {
                  value: editOldPassword ? true : false,
                  message: 'Password is required!',
                },
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters!',
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

            {errors.password?.message && <Text marginLeft="$3">{errors.password?.message}</Text>}

            <Controller
              control={control}
              rules={{
                required: {
                  value: editOldPassword ? true : false,
                  message: 'Please confirm your new password!',
                },
                validate: value =>
                  value === getValues('password') || 'The passwords do not match!',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Confirm new password!"
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

        {errors.passwordRepeat?.message && <Text marginLeft="$3">{errors.passwordRepeat?.message}</Text>}

        {errorMessage && <Text>{errorMessage}</Text>}

        <XStack marginTop='$3' justifyContent='space-between'>
          <Button width='46%' disabled={!isValid} style={{ opacity: isValid ? 1 : 0.7 }} onPress={handleSubmit(onSubmit)}>Save</Button>
          <Button width='46%' variant="outlined" pressStyle={{ borderWidth: 3 }} onPress={() => signOutUserAlert()}>Sign out</Button>
        </XStack>
      </YStack>
      {!editOldPassword && !editPasswordRepeat && !editEmail && !editUsername ? (
        <ThemeSwitch />
      ) :
        <></>
      }
    </>
  );

};


