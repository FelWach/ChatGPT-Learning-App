import {
    Label,
    SelectProps,
    XStack,
    YStack,
} from 'tamagui'
import { DropdownMenu } from '../components/DropdownMenu/DropdownMenu'
import { DropdownMenuItem } from '../components/DropdownMenu/types';
import { atom } from 'jotai';

// Create an atom to manage the selected value
export const fruit1 = atom('apple');
export const fruit2 = atom('banana');

export function DropdownDemo() {

    const itemFruit: DropdownMenuItem[] = [
        { name: 'Apple', id: 'apple', value: 'apple' }, 
        { name: 'Banana', id: 'banana', value: 'banana' },
    ]
    return (
        <YStack space>
            <YStack>
                <Label>
                    Sample
                </Label>
                <DropdownMenu items={itemFruit} label='Fruit' atom={fruit1} />
                <DropdownMenu items={itemFruit} label='Fruit' atom={fruit2} />
            </YStack>
        </YStack>
    );
}