import { Accordion, Input, Paragraph, Square, TextArea, XStack } from "tamagui";
import { Trash, SquarePen, ChevronDown } from '@tamagui/lucide-icons'
import { QuestionsAccordionItemProps } from "../screens/Learnset/types";
import { Button } from "tamagui";

export function QuestionsAccordionItem(props: any) {

    return (
        <Accordion.Item value={props.value} marginBottom="$2" >
            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({ open }) => (
                    <>
                        <Paragraph width={270}>{props.question}</Paragraph>
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
                    <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={() => props.deleteQuestion(props.id)}></Button>
                    <Button
                        icon={SquarePen}
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
