import { useAtom } from "jotai";
import { ToggleGroup, XStack, Text } from "tamagui"
import { selectedValueAtom } from "./atoms";

export function TopicUploadSwitcher(){
    const [selectedValue, setSelectedValue] = useAtom(selectedValueAtom);
    
    return(
        <XStack justifyContent="center">
          <ToggleGroup type="single" value={selectedValue} onValueChange={(val) => { val && setSelectedValue(val) }}>
            <ToggleGroup.Item value="Topic">
              <Text>Choose Topic</Text>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="Files">
              <Text>Upload PDF</Text>
            </ToggleGroup.Item>
          </ToggleGroup>
        </XStack>
    )
}