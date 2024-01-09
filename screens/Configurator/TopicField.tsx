import { useAtom } from "jotai";
import { Input, Label, Stack } from "tamagui"
import { addQuestionsClickedAtom } from "./atoms";
import { topicAtom } from "../../state/atoms";

export function TopicField() {
    const [topic, setTopic] = useAtom(topicAtom);
    const [addQuestionsClicked] = useAtom(addQuestionsClickedAtom);
    console.log("Topic in TopicField: " + topic);

    if (addQuestionsClicked) {
        return (
            <Stack style={{opacity: 0.5 }}>
                <Label paddingBottom={10}>Topic</Label>
                <Input disabled size="$4" borderWidth={2} value={topic} height={70}/>
            </Stack>
        )
    }
    else {
        return (
            <>
                <Label paddingBottom={10}>Topic</Label>
                <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} onChangeText={(text) => { setTopic(text) }} />
            </>
        )

    }
}