import { Button, Tabs } from 'tamagui';
import { User, BookOpen } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai';
import { valueAtom } from '../../screens/TopicsOverview/TopicsOverview';


export default function TabNavigator({ navigation }) {
    const [value, setValue] = useAtom(valueAtom);

    return (        
        <Tabs value={value}  >
            <Tabs.List>                
                <Tabs.Tab value="topicsOverview">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<BookOpen size='$2' />} onPress={() => setValue('topicsOverview')} /*onPress={() => navigation.navigate('TopicsOverview')}*/ />
                </Tabs.Tab>
                <Tabs.Tab value="profile">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<User size='$2' />}  onPress={() => setValue('profile')} /*onPress={() => navigation.navigate('Profile')}*/ />
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}