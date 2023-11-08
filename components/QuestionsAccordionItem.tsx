import { Accordion, Paragraph, Square } from "tamagui";
import { ChevronDown } from '@tamagui/lucide-icons'

export function QuestionsAccordionItem(props: { question: string, answer: string, value: string }) {
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
                <Paragraph>
                    {props.answer}
                </Paragraph>
            </Accordion.Content>
        </Accordion.Item>

    )
}
