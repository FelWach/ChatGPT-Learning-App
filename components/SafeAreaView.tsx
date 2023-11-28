import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'tamagui';

export function SafeAreaView({children}) {
   
    const insets = useSafeAreaInsets();
   
    return (
        <View style={{paddingTop: insets.top, paddingLeft: 10, paddingRight: 10, paddingBottom: insets.bottom}}>
            {children}
        </View>
    )
}