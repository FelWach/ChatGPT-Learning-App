import { Button, H1, ScrollView, View, XStack, Accordion } from "tamagui";
import { Trash, Edit, Plus, ArrowLeft } from '@tamagui/lucide-icons'
import { QuestionsAccordionItem } from "../../components/QuestionsAccordionItem";
import { Alert, Dimensions } from "react-native";
import { QuestionsAccordionItemProps } from "./type";
import { useAtom, atom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils'
import { SafeAreaView } from "../../components/SafeAreaView";

const dataAtom = atom<QuestionsAccordionItemProps[]>([]);

export function Learnset({ navigation }) {
    const [data, setData] = useAtom(dataAtom);

    const dummyData: QuestionsAccordionItemProps[] = [
        {
            question: 'Was ist die Hauptstadt von Deutschland?',
            answer: 'Berlin',
            value: '1'
        },
        {
            question: 'Was ist die Hauptstadt von Frankreich?',
            answer: 'Paris',
            value: '2'
        },
        {
            question: 'Was ist die Hauptstadt von Deutschland? Längerer Text um Umbrechung zu testen.',
            answer: 'Rom',
            value: '3'
        },
        {
            question: 'Was ist die Hauptstadt von Italien?',
            answer: 'Rom',
            value: '4'
        },
        {
            question: 'Was ist die Hauptstadt von Italien?',
            answer: 'Rom',
            value: '5'
        },
        {
            question: 'Was ist die Hauptstadt von Italien?',
            answer: 'Rom',
            value: '6'
        },
        {
            question: 'Was ist die Hauptstadt von Italien?',
            answer: 'Rom',
            value: '7'
        }
    ]

    useHydrateAtoms([[dataAtom, dummyData]])

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
                {/*}<Button icon={ArrowLeft} size="$5" width="$4" height="$4" marginTop="$6"></Button>{*/}
                <XStack display="flex" alignItems="center" justifyContent="space-between">
                    <H1 size="$9" paddingVertical="$4">Geografie</H1>
                    <XStack>
                        <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={deleteSet}></Button>
                        <Button icon={Edit} size="$6" width="$4" height="$4" chromeless onPress={editSet}></Button>
                    </XStack>
                </XStack>

                <Accordion overflow="hidden" width="auto" type="multiple" space="$2">
                    {data.map((topic, index) => (
                        <QuestionsAccordionItem key={index} question={topic.question} answer={topic.answer} value={topic.value} />
                    ))}
                </Accordion>

                <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginVertical="$5" marginBottom="$15">
                    Add Questions
                </Button>
            </ScrollView >

            <Button size="$6" theme="active" style={
                {
                    position: "absolute",
                    bottom: 40,
                    right: 0,
                    left: 0,
                    marginHorizontal: 10,
                }}>Lernen</Button> 
        </SafeAreaView>
    )
    // TODO: add learn button functionality
}
