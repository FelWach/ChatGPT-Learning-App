import React, { Suspense } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H1, Spinner, View, Text } from 'tamagui';
import { useHeaderHeight } from '@react-navigation/elements';
//import { GlobalLoadingIndicator } from '../App';

export function SafeAreaView({ children }) {

    const insets = useSafeAreaInsets();

    //<GlobalLoadingIndicator />
    return (
        <View style={{ paddingTop: insets.top + (useHeaderHeight() ? useHeaderHeight() + 15: 35), paddingLeft: insets.left + 25, paddingRight: insets.right + 25, paddingBottom: insets.bottom + 15 }}>
            
                {children}
        </View >
    )
}