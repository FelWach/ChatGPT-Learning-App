import { Button, H2, Text, View, YStack, TextArea, Input } from 'tamagui';
import { SaveAreaView } from '../components/SafeAreaView';

export default function Features({ navigation }) {

    return (
        <SaveAreaView>
            <YStack margin="$5" space='$5'>
                <H2>Features Overview</H2>
                <Button onPress={() => navigation.navigate('LearnSet')} >
                    <Text>Learnset</Text>
                </Button>
                <Button onPress={() => navigation.navigate('Learning')}>
                    <Text>Learning</Text>
                </Button>
                <Button onPress={() => navigation.navigate('TopicsOverview')}>
                    <Text>Topics Overview</Text>
                </Button>
                {/*}
          <Button onPress={ () => navigation.navigate('Api')}>
               <Text>Api</Text>
          </Button>
    {*/}
                <Button onPress={() => navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                </Button>
            </YStack>
        </SaveAreaView>
    )
}