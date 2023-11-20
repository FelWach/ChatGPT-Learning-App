import { View } from 'react-native';
import { Button } from 'tamagui';
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'
import { addUser, users, deleteUser, login, register, generate, generate2, setConfiguration, getEntries, getUserEntries, getEntriesWithTopic, getEntry, deleteEntry } from '../api/api'

export default function ApiCalls() {
  const [username, setUsername] = useAtom(userAtom);
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useAtom(passwordAtom);
  const [repeatPassword, setRepeatPassword] = useAtom(repeatPasswordAtom);


  const handleGenerate = async () => {
  const data = {
       topic: 'avocado',
       nbQuestions: 3
  };
      const response = await generate(data);
      console.log(response.data)
  };

  const handleGenerateTopic = async () => {
      const response = await generate2('avocado');
      console.log(response.data)
  };

  const handleSetConfiguration = async () => {
      const settings = {
            language: 'en',
            languageLevel: 'B1',
            difficulty: 'medium',
            temperature: 3
      };
      const response = await setConfiguration(settings);
      console.log(response.data.message)
  };

  const handleAllEntries = async () => {
      const response = await getEntries();
      console.log(response.data)
  };

  const handleEntriesUser = async () => {
      const response = await getUserEntries(1);
      console.log(response.data)
  };

  const handleEntriesUserTopic = async () => {
       const response = await getEntriesWithTopic(1, 'avocado');
       console.log(response.data)
  };

  const handleEntry = async () => {
       const response = await getEntry(27);
       console.log(response.data)
  };

  const handleDeleteEntry = async () => {
       const response = await deleteEntry(29);
       console.log(response.data.message)
  };

  const handleAddUser = async () => {
      const data = {
             name: 'avocado',
             email: 'avo@cado.com'
             password: 'iloveavocados'
      };
      const response = await addUser(data);
      console.log(response.data.message)
  };

  const handleUsers = async () => {
      const response = await users();
      console.log(response.data.message)
  };

  const handleDeleteUser = async () => {
      const response = await deleteUser(2);
      console.log(response.data.message)
  };

   const handleLogin = async () => {
      const data = {
               usernameOrEmail: 'Avocado',
               password: '123'
   };
      const response = await login(data);
      console.log(response.data.message)
   };

   const handleRegister = async () => {
      const data = {
               name: 'avocado',
               email: 'avo@cado.com'
               password: 'iloveavocados'
   };
      const response = await register(data);
      console.log(response.data.message)
   };


  return (
    <View>
      <Button onPress= {  handleGenerate }>Generate</Button>
      <Button onPress= {  handleGenerateTopic }>Generate Topic</Button>
      <Button onPress= {  handleSetConfiguration }>Set Configurations</Button>
      <Button onPress= {  handleAllEntries }>Get all Entries</Button>
      <Button onPress= {  handleEntriesUser }>Get My Entries</Button>
      <Button onPress= {  handleEntriesUserTopic }>Get My Entries from Topic</Button>
      <Button onPress= {  handleEntry }>Get Entry</Button>
      <Button onPress= {  handleDeleteEntry }>Delete Entry</Button>
      <Button onPress= {  handleAddUser }>Add User</Button>
      <Button onPress= {  handleUsers }>Get Users</Button>
      <Button onPress= {  handleDeleteUser }>Delete User</Button>
      <Button onPress= {  handleLogin }>Login</Button>
      <Button onPress= {  handleRegister }>Register</Button>

    </View>
  );
};