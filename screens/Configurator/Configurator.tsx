import { Label, Slider, Button, Text, H1, ScrollView, YStack, XStack, Input, ToggleGroup } from "tamagui"
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";
import { DocumentSelect } from "../../components/DocumentSelect";
import { atom, useAtom } from "jotai";
import { filesArray } from "../../components/atoms";
import { accuratenessAtom, languageAtom, languageStyleAtom, questionAtom, dropdownMenuLanguageAtom, dropdownMenuLanguageStyleAtom, dropdownMenuQuestionAtom } from "./atoms";
import { Lock, Brush } from '@tamagui/lucide-icons'

const selectedValueAtom = atom("1");

export function Configurator() {

    const [files, setFiles] = useAtom(filesArray);

    const [question, setQuestion] = useAtom(questionAtom);
    const [language, setLanguage] = useAtom(languageAtom);
    const [languageStyle, setLanguageStyle] = useAtom(languageStyleAtom);
    const [accurateness, setAccurateness] = useAtom(accuratenessAtom);

    const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom);

    const generate = () => {
        console.log("generate")
        console.log(question)
        console.log(language)
        console.log(languageStyle)
        console.log(accurateness)
        if (files.length === 0) {
            console.log("no files selected")
        }
    }
    return (
        <ScrollView>
            <YStack paddingVertical={20}>
                <H1>Configurator</H1>
            </YStack>
            <XStack display="flex" justifyContent="center">
                <ToggleGroup type="single" value={selectedValue} onValueChange={setSelectedValue} >
                    <ToggleGroup.Item value="1">
                        <Text>Choose Topic</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="2">
                        <Text>Upload PDF</Text>
                    </ToggleGroup.Item>
                </ToggleGroup>
            </XStack>
            <YStack space={10} paddingTop={30} paddingBottom={20}>
                {selectedValue === "1" ? (
                    <>
                        <Label>Topic</Label>
                        <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} />
                    </>
                ) : (
                    <DocumentSelect />
                )}
            </YStack>
            <InputBasis />
            <Button onPress={generate}>Generate</Button>
        </ScrollView >
    )
}

function InputBasis() {
    const [questions] = useAtom(dropdownMenuQuestionAtom);
    const [languages] = useAtom(dropdownMenuLanguageAtom);
    const [languageStyles] = useAtom(dropdownMenuLanguageStyleAtom);
    const [accurateness, setAccurateness] = useAtom(accuratenessAtom);

    return (
        <YStack space>
            <YStack space={10}>
                <Label>Questions</Label>
                <DropdownMenu items={questions} label={"Number of Questions"} atom={questionAtom} />
            </YStack>

            <YStack space={10}>
                <Label>Language</Label>
                <DropdownMenu items={languages} label={"Language"} atom={languageAtom}
                />
            </YStack>

            <YStack space={10}>
                <Label>Language Style</Label>
                <DropdownMenu items={languageStyles} label={"Language style"} atom={languageStyleAtom}
                />
            </YStack>

            <YStack paddingTop={20}>
                <Label>Creativity</Label>
                <YStack paddingTop={30}>
                    <Slider defaultValue={[50]} max={100} step={1} onValueChange={(value) => setAccurateness(value[0])}>
                        <Slider.Track>
                            <Slider.TrackActive />
                        </Slider.Track>
                        <Slider.Thumb index={0} circular elevate />
                    </Slider>
                </YStack>
                <XStack paddingTop={20} paddingHorizontal={5} display="flex" justifyContent="space-between">
                    <YStack space="$2">
                        <Lock size="$1" />
                        <Text fontSize="$1">Stick to the topic</Text>
                    </YStack>
                    <YStack alignItems="flex-end" space="$2">
                        <Brush size="$1" />
                        <Text fontSize="$1">Get creative</Text>
                    </YStack>
                </XStack>
            </YStack>
        </YStack>
    )
}