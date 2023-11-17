import { Button, H2, Text, Input, View, SizableText, Tabs, Trigger } from 'tamagui';
import { User,  BookOpen } from '@tamagui/lucide-icons'

export default function TopicsOverview({ navigation }){

    return(
    <View>
        <H2>Your Learn Sets</H2>
        <Tabs value='profile' flexDirection='row' justifyContent='center'>
           <Tabs.List>
              <Tabs.Tab value="profile">
                   <Button unstyled={true} icon={<User size='$2' />} onPress={  () => navigation.navigate('Profile') }/>
              </Tabs.Tab>
              <Tabs.Tab value="topicsOverview">
                    <Button unstyled={true} icon={<BookOpen size='$2' />} onPress={ () => navigation.navigate('TopicsOverview') } />
              </Tabs.Tab>
           </Tabs.List>
        </Tabs>
    </View>
    )
}