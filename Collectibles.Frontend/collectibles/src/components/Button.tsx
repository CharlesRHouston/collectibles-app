import {TouchableOpacity, Text, View, StyleSheet} from "react-native";
import { FC } from "react";
import {fontStyles} from "../styles/fontStyles";
import {buttonContainerStyles, buttonFontStyles} from "../styles/buttonStyles";

interface ButtonProps {
    label: string;
    onPress: () => void;
    type: "primary" | "secondary" | "tertiary"
}

const Button : FC<ButtonProps> = ({label, onPress, type}) => {
    return <TouchableOpacity onPress={onPress} >
        <View style={buttonContainerStyles[type]}>
            <Text style={buttonFontStyles[type]}>{label}</Text>
        </View>
    </TouchableOpacity>
}

export default Button;