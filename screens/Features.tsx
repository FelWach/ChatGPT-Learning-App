import { Button, H2, Text, View, YStack, TextArea, Input } from 'tamagui';
import { SafeAreaView } from '../components/SafeAreaView';
import { useHeaderHeight } from '@react-navigation/elements';

export default function Features({ navigation }) {

    return (
        <SafeAreaView>
            <YStack space='$5'>
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
                <Button onPress={() => navigation.navigate('Api')} >
                    <Text>Api</Text>
                </Button>               
                <Button onPress={() => navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                </Button>
                <Button onPress={() => navigation.navigate('Configurator')}>
                    <Text>Configurator</Text>
                </Button>
            </YStack>
        </SafeAreaView>
    )
}