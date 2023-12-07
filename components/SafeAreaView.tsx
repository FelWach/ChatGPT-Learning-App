import React, { Suspense } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { H1, Spinner, View, Text } from 'tamagui';
import { GlobalLoadingIndicator } from '../App';

export function SaveAreaView({ children }) {

    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top, paddingLeft: 10, paddingRight: 10, paddingBottom: insets.bottom }}>
            <GlobalLoadingIndicator />
                {children}
        </View >
    )
}