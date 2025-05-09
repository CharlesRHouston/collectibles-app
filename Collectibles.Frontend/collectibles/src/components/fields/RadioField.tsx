import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import React from "react";


interface RadioFieldProps {
    label: string;
    value?: boolean|null;
    setValue: (value: boolean) => void;
    optionOneText: string;
    optionTwoText: string;
}

const RadioField : React.FC<RadioFieldProps> = ({ label, value, setValue, optionOneText, optionTwoText }) => {
    
    return (
    <View style={styles.container}>
        <View style={styles.label}>
            <Text style={fontStyles.L3}>{label}</Text>
        </View>
        <View style={styles.radioContainer}>
            <RadioButton 
                condition={value !== null && value === true} 
                onPress={() => setValue(true)} 
                label={optionOneText} 
            />
            <RadioButton
                condition={value !== null && value === false}
                onPress={() => setValue(false)}
                label={optionTwoText}
            />
        </View>
    </View>)
}

interface RadioButtonProps {
    condition: boolean;
    onPress: () => void;
    label: string;
}

const RadioButton : React.FC<RadioButtonProps> = ({ label, condition, onPress }) => {
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.radio}>
            {condition ?
                <Image
                    source={require('../../../assets/radioField/Radio - On.png')}
                /> :
                <Image
                    source={require('../../../assets/radioField/Radio - Off.png')}
                />
            }
            <Text style={fontStyles.L3}>{label}</Text>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 32,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    radio: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8
    }
});

export default RadioField;