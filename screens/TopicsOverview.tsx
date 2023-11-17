import { Button, H2, Text, Input, View, SizableText, Tabs, Trigger, XStack } from 'tamagui';
import { User,  BookOpen } from '@tamagui/lucide-icons'

export default function TopicsOverview({ navigation }){

    return(
    <View>
        <H2>Your Learn Sets</H2>
        <XStack  flexDirection='column' alignItems='center' padding='$4'>
            <Tabs value='profile'>
               <Tabs.List>
                  <Tabs.Tab value="profile" >
                       <Button unstyled={true}  justifyContent='center' size='$4' icon={<User size='$2'/>} onPress={  () => navigation.navigate('Profile') }/>
                  </Tabs.Tab>
                  <Tabs.Tab value="topicsOverview" >
                        <Button unstyled={true} justifyContent='center' size='$4' icon={<BookOpen size='$2'/>} onPress={ () => navigation.navigate('TopicsOverview') } />
                  </Tabs.Tab>
               </Tabs.List>
            </Tabs>
        </XStack>
    </View>
    )
}