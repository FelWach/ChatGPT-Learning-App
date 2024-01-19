import { Switch, XStack, Button } from 'tamagui'
import { Moon, Sun } from '@tamagui/lucide-icons'
import { useSetAtom, useAtom } from 'jotai'
import { switchThemeAtom } from '../../state/atoms'
//import { addTheme, updateTheme, replaceTheme } from '@tamagui/theme'

export default function ThemeSwitch() {
    const [switchOn, setSwitchOn] = useAtom(switchThemeAtom);

    return (
        <XStack alignItems="center" space='$2'>
            <Button unstyled icon={<Moon size='$1' />}></Button>
            <Switch size="$3" checked={switchOn} onCheckedChange={() => {
                if (!switchOn) {
                    setSwitchOn(true)
                }
                else{
                    setSwitchOn(false)
                }
            }}>
                <Switch.Thumb animation='bouncy' />
            </Switch>
            <Button unstyled icon={<Sun size='$1' />}></Button>
        </XStack>
    )
}

