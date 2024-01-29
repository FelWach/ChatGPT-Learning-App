import { Accordion, Input, Paragraph, Square, TextArea, XStack } from "tamagui";
import { Trash, Edit, ChevronDown } from '@tamagui/lucide-icons'
import { QuestionsAccordionItemProps } from "../screens/Learnset/types";
import { Button } from "tamagui";
import { Alert } from "react-native";

import {deleteEntry} from '../api/api'

export function QuestionsAccordionItem(props: any, { navigation }) {

    function deleteQuestion(id : number): void {
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
                        console.log("delete: " + id)
                        deleteEntry(id);
                        // TODO: Refresh the cards
                    }
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <Accordion.Item value={props.value} paddingBottom="$2">
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
                <Paragraph>
                    {props.answer}
                </Paragraph>
                <XStack justifyContent='space-evenly' space>
                    <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={() => deleteQuestion(props.id)}></Button>
                    <Button
                        icon={Edit}
                        size="$6"
                        width="$4"
                        height="$4"
                        chromeless
                        onPress={() => props.handleEditQAndA(props.id, props.answer, props.question)}
                    ></Button>
                </XStack>
            </Accordion.Content>
        </Accordion.Item>

    )
}
