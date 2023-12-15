import { View } from 'react-native';
import { Button } from 'tamagui';
import { useAtom  } from 'jotai'
import { userAtom } from '../state/atoms'
import { addUser, users, deleteUser, login, register, updateUser, generate, generate2, upload, generateFromDocs, setConfiguration, getEntries, getUserEntries, getEntriesWithTopic, getEntry, deleteEntry } from '../api/api'
//import upload from '../api/api'

export default function ApiCalls() {
  const [user, setUser] = useAtom(userAtom);

  const handleGenerate = async () => {
      const data = {
           topic: 'avocado',
           nbQuestions: 3
      };
      try {
          const response = await generate(data);
          console.log(response)
      }
      catch(error: any){
          console.log(error)
      }
  };

  const handleGenerateTopic = async () => {
      try {
          const response = await generate2('avocado');
          console.log(response)
      }
      catch(error: any){
        console.log(error)
      }
  };

  const handleSetConfiguration = async () => {
      const settings = {
            language: 'en',
            languageLevel: 'B1',
            difficulty: 'medium',
            temperature: 3
      };

      try {
          const response = await setConfiguration(settings);
          console.log(response.message)
      }
      catch(error: any){
        console.log(error)
      }
  };

  const handleAllEntries = async () => {
      try {
          const response = await getEntries();
          console.log(response)
      }
      catch(error: any){
        console.log(error.message)
      }
  };

  const handleEntriesUser = async () => {
      try {
          const response = await getUserEntries(1);
          console.log(response)
      }
      catch(error: any){
          console.log(error.message)
      }
  };

  const handleEntriesUserTopic = async () => {
      try {
           const response = await getEntriesWithTopic(1, 'avocado');
           console.log(response)
      }
      catch(error: any){
           console.log(error.message)
      }
  };

  const handleEntry = async () => {
      try {
           const response = await getEntry(27);
           console.log(response)
      }
      catch(error: any){
        console.log(error.message)
      }
  };

  const handleDeleteEntry = async () => {
      try {
           const response = await deleteEntry(29);
           console.log(response.message)
      }
      catch(error: any){
        console.log(error.message)
      }
  };

  const handleAddUser = async () => {
      const data = {
             name: 'avocado',
             email: 'avo@cado.com',
             password: 'iloveavocados'
      };

      try {
        const response = await addUser(data);
        console.log(response.message)
      }
      catch(error: any){
        console.log(error.message)
      }
  };

  const handleUsers = async () => {
      try {
          const response = await users();
          console.log(response)
      }
      catch(error: any){
          console.log(error.message)
      }
  };

  const handleDeleteUser = async () => {
      try {
          const response = await deleteUser(17);
          console.log(response.message)
      }
      catch(error: any){
          console.log(error.message)
      }
  };

   const handleLogin = async () => {
      const data = {
               usernameOrEmail: 'banana',
               password: 'ilovebananas'
       };
       try {
          const response = await login(data);
          console.log(response.message)
       }
       catch(error: any){
          console.log(error.message)
       }
   };

   const handleRegister = async () => {
      const data = {
               name: 'banana',
               email: 'ba@nana.com',
               password: 'ilovebananas'
      };
      try {
        const response = await register(data);
        console.log(response.message)
      }
      catch(error: any){
        console.log(error.message)
      }
   };

   const handleUpdateUser = async () => {
      const data = {
         name: 'banana'
      };
      try {
        const response = await updateUser(180, data);
        console.log(response.message)
      }
      catch(error: any){
        console.log(error.message + '! ' + error.error)
      }
   };

   const handleUpload = async () => {
      const data = {
           uri: 'Foliensatz.pdf',
           name: 'testPdf',
           size: 13
      };
      try {
          const response = await upload(data);
          console.log(response.message)
      }
      catch(error: any){
        console.log(error.error)
      }
   };

   const handleGenerateFromDocs = async () => {
         const uploadData = {
              uri: 'Sample.pdf',
              name: 'sample.pdf',
              size: 3
         };
         const data = {
              nbQuestions: 1,
              pageStart: 1,
              pageEnd: 1
         };

         try {
             const response = await generateFromDocs(uploadData, data);
             console.log(response.message)
         }
         catch(error: any) {
           console.log(error.error)
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
      <Button onPress= {  handleGenerate }>Generate</Button>
      <Button onPress= {  handleGenerateTopic }>Generate Topic</Button>
      <Button onPress= {  handleSetConfiguration }>Set Configurations</Button>
      <Button onPress= {  handleAllEntries }>Get all Entries</Button>
      <Button onPress= {  handleEntriesUser }>Get My Entries</Button>
      <Button onPress= {  handleEntriesUserTopic }>Get My Entries from Topic</Button>
      <Button onPress= {  handleEntry }>Get Entry</Button>
      <Button onPress= {  handleDeleteEntry }>Delete Entry</Button>
      <Button onPress= {  handleUpdateUser }>Update User</Button>
      <Button onPress= {  handleUpload }>Upload</Button>
      <Button onPress= {  handleGenerateFromDocs }>Generate Q&As From PDF</Button>

    </View>
  );
};