import { Button, H1, ScrollView, View, XStack, YStack, Accordion } from "tamagui";
import { Trash, Edit, Plus, ArrowLeft } from '@tamagui/lucide-icons'
import { useEffect, useState } from "react";
import { QuestionsAccordionItem } from "../components/QuestionsAccordionItem";
import { Dimensions } from "react-native";

export function Learnset() {
    const [data, setData] = useState<DummyData[]>([]);

    interface DummyData {
        question: string;
        answer: string;
        value: string;
    }

    useEffect(() => {
        async function fetchData() {
            const dummyData: DummyData[] = [
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
                    question: 'Was ist die Hauptstadt von Italien?',
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
                },

            ];
            setData(dummyData);
        }
        fetchData();
    }, []);

    const windowHeight = Dimensions.get('window').height;
    
    return (
        <View height={windowHeight - 50}>
            <ScrollView>
            <Button icon={ArrowLeft} size="$5" width="$4" height="$4" marginTop="$6"></Button>
                <XStack display="flex" alignItems="center" justifyContent="space-between">
                    <H1 size="$9" paddingVertical="$4">Geografie</H1>
                    <XStack>
                        <Button icon={Trash} size="$5" width="$4" height="$4" chromeless></Button>
                        <Button icon={Edit}  size="$5"  width="$4" height="$4"chromeless></Button>
                    </XStack>
                </XStack>

                <Accordion overflow="hidden" width="auto" type="multiple" space="$2">
                    {data.map((topic, index) => (
                        <QuestionsAccordionItem key={index} question={topic.question} answer={topic.answer} value={topic.value} />
                    ))}
                </Accordion>

                <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginVertical="$5">
                    Add Questions
                </Button>
            </ScrollView >
           
                <Button size="$5" style={
                    {position: "absolute", 
                    bottom: 0, 
                    right: 0,
                    left: 0}}>Lernen</Button>
           
        </View>
    )
}
