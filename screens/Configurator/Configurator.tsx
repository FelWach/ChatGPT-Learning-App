import { Label, SelectProps, Slider, Button, Text, H1, ScrollView, YStack } from "tamagui"
import { DropdownMenu } from "../../components/DropdownMenu"
import { DocumentSelect } from "../../components/DocumentSelect";
import { useAtom } from "jotai";
import { filesArray } from "../../components/atoms";
import { accuratenessAtom, languageAtom, languageStyleAtom, questionAtom } from "./atoms";

export function Configurator() {
    const [question, setQuestion] = useAtom(questionAtom);
    const [language, setLanguage] = useAtom(languageAtom);
    const [languageStyle, setLanguageStyle] = useAtom(languageStyleAtom);
    const [accurateness, setAccurateness] = useAtom(accuratenessAtom);

    const [files, setFiles] = useAtom(filesArray);

    const languages: SelectProps[] = [
        { value: 'en', name: 'English' },
        { value: 'de', name: 'Deutsch' },
        { value: 'fr', name: 'French' },
    ]
    const languageStyles: SelectProps[] = [
        { value: 'normal', name: 'Normal' },
        { value: 'academic', name: 'Academic' },
        { value: 'simplyfied', name: 'Simplyfied' },
        { value: 'elementary', name: 'Elementary' },
    ]
    const questions: SelectProps[] = []
    for (let i = 1; i <= 30; i++) {
        questions.push({ value: i.toString(), name: i.toString() })
    }

    const changeAccurateness = (value: number[]) => {
        if (value[0] < 33) { setAccurateness("varying"); }
        else if (value[0] < 66) { setAccurateness("balanced"); }
        else { setAccurateness("accurate"); }
    }

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
            <YStack space={20}>
                <DocumentSelect />
            </YStack>
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
                    <Label>Accurateness</Label>
                    <YStack paddingTop={30}>
                        <Slider defaultValue={[50]} max={100} step={1} onValueChange={changeAccurateness}>
                            <Slider.Track>
                                <Slider.TrackActive />
                            </Slider.Track>
                            <Slider.Thumb index={0} circular elevate />
                        </Slider>
                        <Text paddingTop={30}>{accurateness}</Text>
                    </YStack>
                </YStack>

                <Button onPress={generate}>Generate</Button>
            </YStack>
        </ScrollView >
    )
}