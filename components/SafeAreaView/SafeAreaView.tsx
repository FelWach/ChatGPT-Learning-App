import { useAtom } from 'jotai';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner, View } from 'tamagui';
import { globalLoadingAtom } from './atoms';

export function SaveAreaView({ children }) {

    const insets = useSafeAreaInsets();
    const [loading] = useAtom(globalLoadingAtom);
    
    return (
        <View style={{ paddingTop: insets.top, paddingLeft: 10, paddingRight: 10, paddingBottom: insets.bottom }}>
               {loading ? <Spinner size='large'/> : children}
        </View >
    )
}