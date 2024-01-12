import { Button, H1, ScrollView, View, XStack, Accordion } from "tamagui";
import { Trash, Edit, Plus, ArrowLeft } from '@tamagui/lucide-icons'
import { QuestionsAccordionItem } from "../../components/QuestionsAccordionItem";
import { Alert, Dimensions } from "react-native";
import { useAtom, atom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils'
import { SafeAreaView } from "../../components/SafeAreaView";
import { QuestionsAnswersData } from "../Learning/types";
import { questionsAnswersAtom, topicAtom } from "../../state/atoms";


export function Learnset({ navigation }) {

    const [questions, setQuestions] = useAtom(questionsAnswersAtom);
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

    // TODO: fix small arrow margin
    // TODO: add back button functionality
    return (
        <SafeAreaView>
            <ScrollView>
                <XStack display="flex" alignItems="center" justifyContent="space-between">
                    <H1 size="$9" paddingBottom="$4">{topic}</H1>
                    <XStack>
                        <Button icon={Trash} size="$6" width="$4" height="$4" paddingBottom="$4" chromeless onPress={deleteSet}></Button>
                        <Button icon={Edit} size="$6" width="$4" height="$4" paddingBottom="$4" chromeless onPress={editSet}></Button>
                    </XStack>
                </XStack>

                <Accordion overflow="hidden" width="auto" type="multiple" space="$2">
                    {questions.map((topic, index) => (
                        <QuestionsAccordionItem key={index} question={topic.Q} answer={topic.A} value={topic.id} />
                    ))}
                </Accordion>

                <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginVertical="$5">
                    Add Questions
                </Button>

                <Button alignSelf="center" size="$5" width="75%" marginBottom="$5" theme="active" onPress={() => navigation.navigate('Learning')}>Lernen</Button> 
            </ScrollView >            
        </SafeAreaView>
    )
    // TODO: add learn button functionality
}
