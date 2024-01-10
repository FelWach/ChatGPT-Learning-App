import { Button, H1, ScrollView, View, XStack, Accordion } from "tamagui";
import { Trash, Edit, Plus, ArrowLeft } from '@tamagui/lucide-icons'
import { QuestionsAccordionItem } from "../../components/QuestionsAccordionItem";
import { Alert } from "react-native";
import { useAtom } from "jotai";
import { SaveAreaView } from "../../components/SafeAreaView";
import { questionsAnswersAtom, topicAtom } from "../../state/atoms";

export function Learnset({ navigation }) {

    const [questions] = useAtom(questionsAnswersAtom);
    const [topic] = useAtom(topicAtom);

    function deleteSet(): void {
        // Display an alert to confirm the deletion
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this set?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        // TODO: implement delete operation
                        console.log('Set deleted!');
                    },
                },
            ],
            { cancelable: false }
        );
    }

    function editSet(): void {
       // TODO: implement edit operation
    }

    return (
        <SaveAreaView>
            <ScrollView>
                <XStack display="flex" alignItems="center" justifyContent="space-between">
                    <H1 size="$9" paddingVertical="$4">{topic}</H1>
                    <XStack>
                        <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={deleteSet}></Button>
                        <Button icon={Edit} size="$6" width="$4" height="$4" chromeless onPress={editSet}></Button>
                    </XStack>
                </XStack>

                <Accordion overflow="hidden" width="auto" type="multiple" space="$2">
                    {questions.map((topic, index) => (
                        <QuestionsAccordionItem key={index} question={topic.Q} answer={topic.A} value={topic.id} />
                    ))}
                </Accordion>

                <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginVertical="$5" marginBottom="$15" onPress={() => navigation.navigate('Configurator', {addQuestionsClicked: true})}>
                    Add Questions
                </Button>
            </ScrollView >

            <Button size="$6" theme="active" onPress={() => navigation.navigate('Learning')} style={
                {
                    position: "absolute",
                    bottom: 40,
                    right: 0,
                    left: 0,
                    marginHorizontal: 10,
                    
                }}>Lernen</Button> 
        </SaveAreaView>
    )
}
