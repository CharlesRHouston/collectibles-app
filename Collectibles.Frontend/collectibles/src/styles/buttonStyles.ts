import {StyleSheet} from "react-native";
import {fontStyles} from "./fontStyles";

const buttonStyles = StyleSheet.create({
    base: {
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 4,
        paddingHorizontal: 24,
        height: 44,
        alignItems: 'center'
    }
});

export const buttonContainerStyles = StyleSheet.create({
    primary: {
        ...buttonStyles.base,
        borderColor: '#2F142F',
        backgroundColor: '#2A584F',
    },
    secondary: {
        ...buttonStyles.base,
        borderColor: '#2A584F',
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    },
    tertiary: {
        ...buttonStyles.base,
        backgroundColor: 'transparent',
        borderWidth: 0,
    }
});

export const buttonFontStyles = StyleSheet.create({
    primary: {
        ...fontStyles.L2,
        color: 'white'
    },
    secondary: {
        ...fontStyles.L2,
        color: 'black',
    },
    tertiary: {
        ...fontStyles.L3,
        color: '#2A584F',
    }
});