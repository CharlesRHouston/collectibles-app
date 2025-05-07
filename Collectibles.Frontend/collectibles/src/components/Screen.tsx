import {fontStyles} from "../styles/fontStyles";
import {Image, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import BackArrow from "./BackArrow";

interface ScreenProps {
    title: string;
    backNavigation: boolean;
    children: React.ReactNode;
    dismissKeyboard?: boolean;
}

const Screen : React.FC<ScreenProps> = ({title, backNavigation, children, dismissKeyboard=false}) => {
    const screen = <View style={backNavigation ?
        screenStyles.containerWithNavigation :
        screenStyles.containerWithoutNavigation
    }>
        {backNavigation && <BackArrow />}
        <Text style={fontStyles.H3}>
            {title}
        </Text>
        {children}
    </View>;
    
    if (dismissKeyboard){
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ borderWidth: 3, borderColor: 'red'}}>
                {screen}
            </TouchableWithoutFeedback>
        )
    }
    return (screen)
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