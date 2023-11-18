import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export function SaveAreaView({children}) {
   
    const insets = useSafeAreaInsets();
   
    return (
        <View style={{paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right}}>
            {children}
        </View>
    )
}