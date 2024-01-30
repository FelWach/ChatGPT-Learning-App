import { Switch, XStack, Button, YStack, Text } from "tamagui";
import { Moon, Sun } from "@tamagui/lucide-icons";
import { useSetAtom, useAtom } from "jotai";
import { switchThemeAtom, themeColorAtom } from "../../state/atoms";
//import { addTheme, updateTheme, replaceTheme } from '@tamagui/theme'

export default function ThemeSwitch() {
  const [switchOn, setSwitchOn] = useAtom(switchThemeAtom);
  const setThemeColor = useSetAtom(themeColorAtom);

  return (
    <YStack width="100%" alignItems="center" marginTop="$6" space="$5">
      <Text>Let's get some color in here!</Text>
      <XStack alignItems="center" space="$2">
        <Button unstyled icon={<Moon size="$1" />} />
        <Switch
          size="$4"
          checked={switchOn}
          onCheckedChange={() => {
            if (!switchOn) {
              setSwitchOn(true);
            } else {
              setSwitchOn(false);
            }
          }}
        >
          <Switch.Thumb animation="bouncy" />
        </Switch>
        <Button unstyled icon={<Sun size="$1" />} />
      </XStack>
      <XStack marginTop="$2">
        <Button
          unstyled={true}
          circular={true}
          backgroundColor={"$blue10Light"}
          size="$1"
          onPress={() => setThemeColor("blue")}
        />
        <Button
          unstyled={true}
          circular={true}
          marginLeft="$7"
          backgroundColor={"$red10Light"}
          size="$1"
          onPress={() => setThemeColor("red")}
        />
        <Button
          unstyled={true}
          circular={true}
          marginLeft="$7"
          backgroundColor={"$yellow10Light"}
          size="$1"
          onPress={() => setThemeColor("yellow")}
        />
        <Button
          unstyled={true}
          circular={true}
          marginLeft="$7"
          backgroundColor={"$green10Light"}
          size="$1"
          onPress={() => setThemeColor("green")}
        />
        <Button
          unstyled={true}
          circular={true}
          marginLeft="$7"
          backgroundColor={"$purple10Light"}
          size="$1"
          onPress={() => setThemeColor("purple")}
        />
      </XStack>
    </YStack>
  );
}
