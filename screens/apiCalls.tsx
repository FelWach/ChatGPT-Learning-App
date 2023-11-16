import { View } from 'react-native';
import { Button, H2, Text, Input } from 'tamagui';
import { useAtom  } from 'jotai'
import { userAtom, passwordAtom, emailAtom, repeatPasswordAtom } from '../state/atoms'
import { generate, generate2, setConfiguration, getEntries, getUserEntries, getEntriesWithTopic, getEntry, deleteEntry } from '../api/api'

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

    </View>
  );
};