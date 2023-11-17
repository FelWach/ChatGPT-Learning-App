import { View } from 'react-native';
import { Button, H2, Text, Input, H1 } from 'tamagui';
import { atom } from 'jotai'
import { useAtom  } from 'jotai';
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'

export default function UserSettings({ navigation }) {

    const [username, setUsername] = useAtom(userAtom);  
    const [email, setEmail] = useAtom(emailAtom);
    const [password, setPassword] = useAtom(passwordAtom);
    const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);

    const tempUsernameAtom = atom<string>(username);
    const tempPasswordAtom = atom<string>(password);
    const tempEmailAtom = atom<string>(email);

    const [tempUsername, setTempUsername] = useAtom(tempUsernameAtom);
    const [tempPassword, setTempPassword] = useAtom(tempPasswordAtom);
    const [tempEmail, setTempEmail] = useAtom(tempEmailAtom);

    const saveUserData = () => {
        setUsername(tempUsername);
        setEmail(tempEmail);
        setPassword(tempPassword);
        setRepeatPassword(repeatPassword);
    }
    return (
        <View>
            <H1>Your Profile</H1>
            <Input
                value={tempUsername}
                onChangeText={setTempUsername}
                placeholder={'Username'}
            />
            <Input
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder={'Email'}
            />
            <Input
                value={tempPassword}
                onChangeText={setTempPassword}
                placeholder={'Password'}
                secureTextEntry={true}
            />
            <Input
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder={'Repeat Password'}
            />
            <Button onPress={() => saveUserData()}>Save</Button>
        </View>
    )
}