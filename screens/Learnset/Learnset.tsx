import { Button, H1, ScrollView, View, XStack, Accordion, Input, Paragraph, TextArea } from "tamagui";
import { Trash, Edit, Plus, ArrowLeft, X } from '@tamagui/lucide-icons'
import { QuestionsAccordionItem } from "../../components/QuestionsAccordionItem";
import { Alert, Dimensions } from "react-native";
import { useAtom, atom } from "jotai";
import { useHydrateAtoms } from 'jotai/utils'
import { SaveAreaView } from "../../components/SafeAreaView";
import { QuestionsAnswersData } from "../Learning/types";
import { questionsAnswersAtom, topicAtom } from "../../state/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { deleteEntry } from "../../api/api";

const isEditingQAndAAtom = atom<boolean>(false);

// atoms for editing Q and A
const idAtom = atom<number>(0);
const questionAtom = atom<string>('');
const answerAtom = atom<string>('');

export function Learnset({ navigation }) {

    const queryClient = useQueryClient();
    
    const [questions, setQuestions] = useAtom(questionsAnswersAtom);
    const [topic] = useAtom(topicAtom);

    const [isEditingQAndA, setIsEditingQAndA] = useAtom(isEditingQAndAAtom);

    const [id, setId] = useAtom(idAtom);
    const [question, setQuestion] = useAtom(questionAtom);
    const [answer, setAnswer] = useAtom(answerAtom);

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
                        
                    },
                },
            ],
            { cancelable: false }
        );
    }

    function editSet(): void {
       // TODO: implement edit operation
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
    
    const handleSaveQandA = (id: number): void => {
        setIsEditingQAndA(!isEditingQAndA);
        console.log("Saving Q and A with id: " + id);
    };


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
                        <Button alignSelf="center" size="$4" theme="active" marginVertical="$5" marginBottom="$15" onPress={() => handleSaveQandA(id)}>
                            Save
                        </Button>
                    </XStack>
                    :
                <Button alignSelf="center" icon={Plus} size="$4" variant="outlined" marginVertical="$5" marginBottom="$15">
                    Add Questions
                </Button>
                }
                
            </ScrollView >
            {isEditingQAndA ? null :
            <Button size="$6" theme="active" onPress={() => navigation.navigate('Learning')} style={
                {
                    position: "absolute",
                    bottom: 40,
                    right: 0,
                    left: 0,
                    marginHorizontal: 10,
                    
                }}>Lernen</Button> 
            }
        </SaveAreaView>
    )
    // TODO: add learn button functionality
}
