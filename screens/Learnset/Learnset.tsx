import { Button, H1, ScrollView, View, XStack, Accordion, Input, Paragraph, TextArea } from "tamagui";
import { Trash, SquarePen, Plus, } from '@tamagui/lucide-icons'
import { QuestionsAccordionItem } from "../../components/QuestionsAccordionItem";
import { Alert, Dimensions } from "react-native";
import { useAtom, atom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils'
import { SafeAreaView } from "../../components/SafeAreaView";
import { QuestionsAnswersData } from "../Learning/types";
import { questionsAnswersAtom, topicAtom, userAtom } from "../../state/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { deleteEntry, updateTopic, deleteTopic, updateAnswer, updateQuestion } from "../../api/api";
import { useEffect } from "react";

const isEditingQAndAAtom = atom<boolean>(false);

// atoms for editing Q and A
const idAtom = atom<number>(0);
const questionAtom = atom<string>('');
const answerAtom = atom<string>('');
const tempTopicAtom = atom<string>('');
const isEditingTopicAtom = atom<boolean>(false);

export function Learnset({ navigation }) {

    const queryClient = useQueryClient();

    const [user, setUser] = useAtom(userAtom);

    const [questions, setQuestions] = useAtom(questionsAnswersAtom);
    const [topic] = useAtom(topicAtom);
    const [tempTopic, setTempTopic] = useAtom(tempTopicAtom);

    const [isEditingQAndA, setIsEditingQAndA] = useAtom(isEditingQAndAAtom);
    const [isEditingTopic, setIsEditingTopic] = useAtom(isEditingTopicAtom);

    const [id, setId] = useAtom(idAtom);
    const [question, setQuestion] = useAtom(questionAtom);
    const [answer, setAnswer] = useAtom(answerAtom);

    useEffect(() => {
        setTempTopic(topic);
    }, []);

    function deleteQuestion(id: number): void {
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
                        queryClient.invalidateQueries({ queryKey: ['topics'] });
                        navigation.navigate('TopicsOverview');
                    }
                },
            ],
            { cancelable: false }
        );
    }

    function updateQAndA(id: number, question: string, answer: string): void {
        Alert.alert(
            'Confirm Changes',
            'Are you sure you want to change the question and answer?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Save',
                    onPress: () => {
                        setIsEditingQAndA(false);
                        updateQuestion(id, question);
                        updateAnswer(id, answer);
                        queryClient.invalidateQueries({ queryKey: ['topics'] });
                        navigation.navigate('TopicsOverview');
                    }
                },
            ],
            { cancelable: false }
        );
    }


    function deleteSet(): void {
        // Display an alert to confirm the deletion
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this Topic set?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        deleteTopic(user.id, topic);
                        queryClient.invalidateQueries({ queryKey: ['topics'] });
                        navigation.navigate('TopicsOverview');
                    },
                },
            ],
            { cancelable: false }
        );
    }

    function updateTopicName(): void {
        setIsEditingTopic(false);
        updateTopic(user.id, topic, tempTopic);
        queryClient.invalidateQueries({ queryKey: ['topics'] });
        navigation.navigate('TopicsOverview');
    }

    function handleEditTopicName(): void {
        isEditingTopic ? setIsEditingTopic(false) : setIsEditingTopic(true);
        setTempTopic(topic);
    }

    const handleEditQAndA = (id?: number, answer?: any, question?: any): void => {
        if (id && answer && question) {
            setIsEditingQAndA(true);
            setId(id);
            setQuestion(question);
            setAnswer(answer);
        } else {
            setIsEditingQAndA(false);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <XStack display="flex" alignItems="center" justifyContent="space-between">
                    {isEditingTopic ?
                    <>
                        <Input 
                            width="$12"
                            marginBottom="$4"
                            marginTop="$4"
                            placeholder="Edit the Name of the Topic"
                            value={tempTopic}
                            onChangeText={setTempTopic}
                        />
                    <XStack space>
                        <Button alignSelf="center" size="$4" variant="outlined" marginVertical="$5" onPress={handleEditTopicName}>
                            Cancel
                        </Button>
                        <Button alignSelf="center" size="$4" theme="active" marginVertical="$5" onPress={updateTopicName}>
                            Save
                        </Button>
                    </XStack>
                    </>
                    :
                    <>
                        <H1 size="$9" paddingVertical="$4">{topic}</H1>
                        <XStack>
                            <Button icon={Trash} size="$6" width="$4" height="$4" chromeless onPress={deleteSet}></Button>
                            <Button icon={SquarePen} size="$6" width="$4" height="$4" chromeless onPress={handleEditTopicName}></Button>
                        </XStack>
                    </>

                    }
                </XStack>

                <Accordion overflow="hidden" width="auto" type="multiple" space="$2">
                    {isEditingQAndA ?
                        <>
                            <Input
                                placeholder="Edit question"
                                value={question}
                                onChangeText={setQuestion}
                            />
                            <TextArea
                                placeholder="Edit answer"
                                value={answer}
                                onChangeText={setAnswer}
                            />
                        </>
                        :
                        <>
                            {questions.map((topic, index) => (
                                <QuestionsAccordionItem
                                    key={index}
                                    id={topic.id}
                                    question={topic.Q}
                                    answer={topic.A}
                                    value={topic.id}
                                    handleEditQAndA={handleEditQAndA}
                                    deleteQuestion={deleteQuestion}
                                />
                            ))}

                        </>}
                </Accordion>
                {isEditingQAndA ?
                    <XStack justifyContent="space-between">
                        <Button alignSelf="center" size="$4" variant="outlined" marginVertical="$5" marginBottom="$15" onPress={handleEditQAndA}>
                            Cancel
                        </Button>
                        <Button alignSelf="center" size="$4" theme="active" marginVertical="$5" marginBottom="$15" onPress={() => updateQAndA(id, question, answer)}>
                            Save
                        </Button>
                    </XStack>
                    :
                    <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginTop="$5" pressStyle={{ borderWidth: 3 }} onPress={() => navigation.navigate('Configurator', { addQuestionsClicked: true })}>
                        Add Questions
                    </Button>
                }
                {isEditingQAndA ? null :
                    <Button size="$5" width="75%" theme='active' alignSelf="center" marginVertical="$5" onPress={() => navigation.navigate('Learning')}>Lernen</Button>
                }
            </ScrollView >
        </SafeAreaView >
    )
}
