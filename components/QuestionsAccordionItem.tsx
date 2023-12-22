import { Accordion, Input, Paragraph, Square, TextArea, XStack } from "tamagui";
import { Trash, Edit, ChevronDown } from '@tamagui/lucide-icons'
import { QuestionsAccordionItemProps } from "../screens/Learnset/types";
import { Button } from "tamagui";
import { Alert } from "react-native";
import { atom, useAtom } from "jotai";

const isEditingAnswerAtom = atom<boolean>(false);

export function QuestionsAccordionItem(props: QuestionsAccordionItemProps, { navigation }) {

    const [isEditingA, setIsEditingA] = useAtom(isEditingAnswerAtom);

    function deleteQuestion(): void {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this question?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log('Question deleted!');
                    }
                },
            ],
            { cancelable: false }
        );
    }

    function handleEditQuestion(): void {
        isEditingA ? setIsEditingA(false) : setIsEditingA(true);
    }


    return (
        <Accordion.Item value={props.value} >
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({ open }) => (
                    <>
                        <Paragraph>{props.question}</Paragraph>
                        <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                            <ChevronDown size="$1" />
                        </Square>
                    </>
                )}
            </Accordion.Trigger>
            <Accordion.Content>
                {isEditingA ? 
                    <TextArea placeholder="Edit answer" value={props.answer}/> 
                    :
                    <Paragraph>
                        {props.answer}
                    </Paragraph>
                }
                <XStack justifyContent='space-evenly' space>
                    <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={deleteQuestion}></Button>
                    <Button icon={Edit} size="$6" width="$4" height="$4" chromeless onPress={handleEditQuestion}></Button>
                </XStack>
            </Accordion.Content>
        </Accordion.Item>

    )
}
