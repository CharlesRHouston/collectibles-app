import {StyleSheet} from "react-native";
import {fontStyles} from "./fontStyles";

export const errorStyles = StyleSheet.create({
    text: {
        ...fontStyles.L3,
        color: '#2A584F'
    },
    container: {
        gap: 8,
        flexDirection: 'column',
        alignItems: 'center'
    }
})