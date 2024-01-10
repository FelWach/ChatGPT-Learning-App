import { useAtom } from "jotai";
import { Input, Label, Stack } from "tamagui"
import { topicAtom } from "../../state/atoms";

export function TopicField(props: { addQuestionsClicked: boolean }) {
    const [topic, setTopic] = useAtom(topicAtom);
    
    if (props.addQuestionsClicked) {
        return (
            <Stack style={{ opacity: 0.6 }}>
                <Label paddingBottom={10}>Topic</Label>
                <Input size="$4" borderWidth={2} placeholder={topic} height={70} disabled />
            </Stack>
        )
    } else {
        return (
            <>
                <Label paddingBottom={10}>Topic</Label>
                <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} onChangeText={(text) => { setTopic(text) }} />
            </>
        )
    }
}

