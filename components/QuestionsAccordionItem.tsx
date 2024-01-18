import { Accordion, Paragraph, Square } from "tamagui";
import { ChevronDown } from '@tamagui/lucide-icons'
import { QuestionsAccordionItemProps } from "../screens/Learnset/types";


export function QuestionsAccordionItem(props: QuestionsAccordionItemProps) {
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
            </Accordion.Content>
        </Accordion.Item>

    )
}
