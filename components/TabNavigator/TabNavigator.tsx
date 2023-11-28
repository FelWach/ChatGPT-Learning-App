import { Button, Tabs } from 'tamagui';
import { User,  BookOpen } from '@tamagui/lucide-icons'

export default function TabNavigator({ navigation, value }){

    return(
        <Tabs value={value}  >
            <Tabs.List>
              <Tabs.Tab value="profile">
                  <Button unstyled={true} justifyContent='center' size='$3' icon={<User size='$2'/>} onPress={  () => navigation.navigate('Profile') } />
              </Tabs.Tab>
              <Tabs.Tab value="topicsOverview">
                 <Button unstyled={true} justifyContent='center' size='$3' icon={<BookOpen size='$2'/>} onPress={ () => navigation.navigate('TopicsOverview') } />
              </Tabs.Tab>
            </Tabs.List>
        </Tabs>
    )
}