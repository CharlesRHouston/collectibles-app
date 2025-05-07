import {fontStyles} from "../styles/fontStyles";
import {StyleSheet, Text, View} from "react-native";
import React from "react";
import BackArrow from "./BackArrow";

interface ScreenProps {
    title: string;
    backNavigation: boolean;
    children: React.ReactNode;
}

const Screen : React.FC<ScreenProps> = ({title, backNavigation, children}) => {
    return (
        <View style={backNavigation ? 
            screenStyles.containerWithNavigation :
            screenStyles.containerWithoutNavigation
        }>
            {backNavigation && <BackArrow />}
            <Text style={fontStyles.H3}>
                {title}
            </Text>
            {children}
        </View>
    )
}

const baseStyles = StyleSheet.create({
    base: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6EB8A8',
        paddingHorizontal: 16,
        gap: 24,
        width: '100%',
    }
})
export const screenStyles = StyleSheet.create({
    containerWithNavigation: {
        ...baseStyles.base,
        paddingTop: 56,
        
    },
    containerWithoutNavigation: {
        ...baseStyles.base,
        paddingTop: 80,
    }
})

export default Screen;