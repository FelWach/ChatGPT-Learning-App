import { View } from 'react-native';
import { Button } from 'tamagui';
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'
import { addUser, users, deleteUser, login, register, updateUser, generate, generate2, setConfiguration, upload, getEntries, getUserEntries, getEntriesWithTopic, getEntry, deleteEntry } from '../api/api'

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
             email: 'avo@cado.com',
             password: 'iloveavocados'
      };
      const response = await addUser(data);
      console.log(response.data.message)
  };

  const handleUsers = async () => {
      const response = await users();
      console.log(response.data)
  };

  const handleDeleteUser = async () => {
      const response = await deleteUser(17);
      console.log(response.data.message)
  };

   const handleLogin = async () => {
      const data = {
               usernameOrEmail: 'banana',
               password: 'ilovebananas'
   };
      const response = await login(data);
      console.log(response.data)
   };

   const handleRegister = async () => {
      const data = {
               name: 'banana',
               email: 'ba@nana.com',
               password: 'ilovebananas'
      };
      const response = await register(data);
      console.log(response.data.message)
   };

   const handleUpdateUser = async () => {
      const data = {
         name: 'banana'
      };
      try {
        const response = await updateUser(18, data);
        console.log(response.message)
      }
      catch(error: any){
        console.log(error.message + '! ' + error.error)
      }
   };

   const handleUpload = async () => {
      const data = {
           uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
           name: 'dummyPDF',
           size: 13
      };
      const response = await upload(data);
      if (response.error){
        console.log(response.error)
      }
      else {
        console.log(response.message)
        console.log('Number of Pages: ' + response.pages)
      }
   };


  return (
    <View>
    {/*}
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
      {*/}
      <Button onPress= {  handleUpdateUser }>Update User</Button>
      <Button onPress= {  handleUpload }>Upload</Button>

    </View>
  );
};