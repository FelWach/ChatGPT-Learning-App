import React, { useReducer } from 'react';
import { View } from 'react-native';
import { Button, Text, Input, H1, XStack } from 'tamagui'; // Removed unused imports
import { Pencil, X } from '@tamagui/lucide-icons';
import { useAtom } from 'jotai';
import { atom } from 'jotai';
import { userAtom } from '../state/atoms';

const passwordAtom = atom<string>('');
const repeatPasswordAtom = atom<string>('');
const editingPasswordAtom = atom<boolean>(false);

export default function UserSettings({ navigation }) {
    
    const [user, setUser] = useAtom(userAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);
    const [isEditingPassword, setIsEditingPassword] = useAtom(editingPasswordAtom);
  
    const saveUserData = () => {
        // Handle changes
    };

    const editUsername = () => {
        // Handle changes
    };

    const editEmail = () => {
        // Handle changes
    };

    const editPassword = () => {
        isEditingPassword ? setIsEditingPassword(false) : setIsEditingPassword(true);
        // Handle changes
    };
  
    return (
      <View>
        <H1>Your Profile</H1>
        <XStack alignItems="center" space="$2">
            <Input
            value={user.name}
            onChangeText={(value) => setUser({...user, name: value})}
            placeholder={'Username'}
            />
            <Button onPress={() => editUsername()}>
            <Pencil />
            </Button>
        </XStack>
        <XStack alignItems="center" space="$2">
            <Input
            value={user.email}
            onChangeText={(value) => setUser({...user, email: value})}
            placeholder={'Email'}
            />
            <Button onPress={() => editEmail()}>
            <Pencil />
            </Button>
        </XStack>
        <XStack alignItems="center" space="$2">
            <Input
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder={'Password'}
            secureTextEntry={true}
            />
            <Button onPress={() => editPassword()}>
            <Pencil />
            </Button>
        </XStack>
        {isEditingPassword && 
            <XStack alignItems="center" space="$2">
                <Input
                value={repeatPassword}
                onChangeText={(value) => setRepeatPassword(value)}
                placeholder={'Repeat Password'}
                />
            </XStack>
        }
        <Button onPress={saveUserData, () => navigation.navigate('StartScreen')}>Save</Button>
      </View>
    );
  }
  