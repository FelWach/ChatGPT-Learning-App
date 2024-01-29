import { Button, Tabs } from 'tamagui';
import { User, BookOpen } from '@tamagui/lucide-icons'
import { useAtom } from 'jotai';
import { tabValueAtom } from '../../screens/TopicsOverview/TopicsOverview';


export default function TabNavigator() {
    const [tabValue, setTabValue] = useAtom(tabValueAtom);

    return (        
        <Tabs value={tabValue}  >
            <Tabs.List>                
                <Tabs.Tab value="topicsOverview">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<BookOpen size='$2' />} onPress={() => setTabValue('topicsOverview')} />
                </Tabs.Tab>
                <Tabs.Tab value="profile">
                    <Button unstyled={true} alignItems='center' padding='$3' icon={<User size='$2' />}  onPress={() => setTabValue('profile')} />
                </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}