import { useAtom } from "jotai";
import { Input, Label } from "tamagui"
import { topicAtom } from "../../state/atoms";

export function TopicField() {
    const [, setTopic] = useAtom(topicAtom);
        return (
            <>
                <Label paddingBottom={10}>Topic</Label>
                <Input size="$4" borderWidth={2} placeholder="e.g. Javascript" height={70} onChangeText={(text) => { setTopic(text) }} />
            </>
        )
}