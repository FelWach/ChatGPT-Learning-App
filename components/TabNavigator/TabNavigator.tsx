import { Button, Tabs } from 'tamagui';
import { User, BookOpen } from '@tamagui/lucide-icons'
import { useAtom, atom } from 'jotai';

export default function TabNavigator({ navigation, value }) {

    return (        
        <Tabs value={value}  >
            <Tabs.List>
                <Tabs.Tab value="profile">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<User size='$2' />}  onPress={() => navigation.navigate('Profile')} />
                </Tabs.Tab>
                <Tabs.Tab value="topicsOverview">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<BookOpen size='$2' />}  onPress={() => navigation.navigate('TopicsOverview')} />
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
/*
        <Tab.Navigator>
            <Tab.Screen></Tab.Screen>
        </Tab.Navigator>
        */
    )
}