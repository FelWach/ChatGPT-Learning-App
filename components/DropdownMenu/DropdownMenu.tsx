import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useEffect, useMemo, useState } from 'react'
import {
    Adapt,
    Select,
    SelectProps,
    Sheet,
    YStack,
} from 'tamagui'
import { DropdownMenuItem } from './types'
import { Atom, useAtom } from 'jotai'

/* USAGE:
* See pages/DropdownDemo.tsx
* Items are passed in as an array of type DropdownMenuItem
* label: is a string that will be displayed above the dropdown menu
* atom: is an atom that will be used to manage the selected value
*/
export function DropdownMenu({ ...props }: SelectProps & { items: DropdownMenuItem[], label: string, atom: Atom<string>}) {
    
    const [val, setVal] = useAtom(props.atom)
    const id = props.label;
    
    return (
        <Select
            id={id}
            value={val}
            onValueChange={setVal}
            disablePreventBodyScroll
            {...props}
        >
            <Select.Trigger iconAfter={ChevronDown}>
                <Select.Value placeholder="Something" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet
                    native={!!props.native}
                    modal
                    dismissOnSnapToBottom
                    animationConfig={{
                        type: 'spring',
                        damping: 20,
                        mass: 1.2,
                        stiffness: 250,
                    }}
                >
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>
            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronUp size={20} />
                    </YStack>
                </Select.ScrollUpButton>
                <Select.Viewport
                    // to do animations:
                    // animation="quick"
                    // animateOnly={['transform', 'opacity']}
                    // enterStyle={{ o: 0, y: -10 }}
                    // exitStyle={{ o: 0, y: 10 }}
                    minWidth={200}
                >
                    <Select.Group>
                        <Select.Label>{props.label}</Select.Label>
                        {/* for longer lists memoizing these is useful */}
                        {useMemo(
                            () =>
                                props.items.map((item, i) => {
                                    return (
                                        <Select.Item
                                            debug="verbose"
                                            index={i}
                                            key={item.id}
                                            value={item.value}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [props.items]
                        )}
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    width="100%"
                    height="$3"
                >
                    <YStack zIndex={10}>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select>
    )
}


