import {
    Label,
    SelectProps,
    XStack,
    YStack,
} from 'tamagui'
import { DropdownMenu } from '../components/DropdownMenu'

export function DropdownDemo() {

    const itemFruit: SelectProps[] = [
        { name: 'Apple', id: 'apple', value: 'apple' }, // value is required
        { name: 'Banana', id: 'banana', value: 'banana' },
    ]
    return (
        <YStack space>
            <XStack ai="center" space>
                <Label f={1} fb={0}>
                    Sample
                </Label>
                <DropdownMenu items={itemFruit} native={true} /> 
            </XStack>
        </YStack>
    );
}