import { Switch, XStack, Button } from 'tamagui'
import { Moon, Sun } from '@tamagui/lucide-icons'
import { useSetAtom, useAtom } from 'jotai'
import { switchThemeAtom, themeColorAtom } from '../../state/atoms'
//import { addTheme, updateTheme, replaceTheme } from '@tamagui/theme'

export default function ThemeSwitch() {
    const [switchOn, setSwitchOn] = useAtom(switchThemeAtom);
    const setThemeColor = useSetAtom(themeColorAtom);

    return (
        <XStack width='$100%'  alignItems='center' marginBottom='$6'>
            <XStack alignItems='center' space='$2'>
                <Button unstyled icon={<Moon size='$1' />} />
                <Switch size="$3" checked={switchOn} onCheckedChange={() => {
                    if (!switchOn) {
                        setSwitchOn(true)
                    }
                    else {
                        setSwitchOn(false)
                    }
                }}>
                    <Switch.Thumb animation='bouncy' />
                </Switch>
                <Button unstyled icon={<Sun size='$1' />} />
            </XStack>
            <XStack >
                <Button unstyled={true} circular={true} marginLeft='$7' backgroundColor={'$blue10Light'} size="$1" onPress={() => setThemeColor('blue')} />
                <Button unstyled={true} circular={true}  marginLeft='$4' backgroundColor={'$red10Light'} size="$1" onPress={() => setThemeColor('red')} />
                <Button unstyled={true} circular={true}  marginLeft='$4' backgroundColor={'$yellow10Light'} size="$1" onPress={() => setThemeColor('yellow')} />
                <Button unstyled={true} circular={true}  marginLeft='$4' backgroundColor={'$green10Light'} size="$1" onPress={() => setThemeColor('green')} />
                <Button unstyled={true} circular={true}  marginLeft='$4' backgroundColor={'$purple10Light'} size="$1" onPress={() => setThemeColor('purple')} />
            </XStack>
        </XStack>

    )
}

