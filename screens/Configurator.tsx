import { Label, SelectProps, Slider, XStack, YStack, Button, View, Text, H1, ScrollView } from "tamagui"
import { DropdownMenu } from "../components/DropdownMenu"
import { useState } from "react"
import { DocumentSelect } from "../components/DocumentSelect";

export function Configurator() {
    let [accurateness, setAccurateness] = useState("balanced");

    let [question, setQuestion] = useState("1");
    let [language, setLanguage] = useState("en");
    let [languageStyle, setLanguageStyle] = useState("casual");

    const languages: SelectProps[] = [
        { value: 'en', name: 'English' },
        { value: 'de', name: 'Deutsch' },
    ]
    const languageStyles: SelectProps[] = [
        { value: 'academic', name: 'Academic' },
        { value: 'casual', name: 'Casual' },
    ]
    const questions: SelectProps[] = [
        { value: '1', name: '1' },
        { value: '2', name: '2' },
        { value: '3', name: '3' },
        { value: '4', name: '4' },
        { value: '5', name: '5' },
        { value: '6', name: '6' },
        { value: '7', name: '7' },
        { value: '8', name: '8' },
        { value: '9', name: '9' },
        { value: '10', name: '10' },
    ]
    
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
                    <DropdownMenu items={questions} label={"Number of Questions"} onChange={(value) => { setQuestion(value) }} />
                </YStack>

                <YStack space={10}>
                    <Label>Language</Label>
                    <DropdownMenu items={languages} label={"Language"} onChange={(value) => { setLanguage(value) }}
                    />
                </YStack>

                <YStack space={10}>
                    <Label>Language Style</Label>
                    <DropdownMenu items={languageStyles} label={"Language style"} onChange={(value) => { setLanguageStyle(value) }}
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