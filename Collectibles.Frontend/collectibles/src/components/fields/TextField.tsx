import {
    TextInput,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {fontStyles} from "../../styles/fontStyles";
import {useState} from "react";
import { AntDesign } from '@expo/vector-icons';

interface TextFieldProps {
    label: string;
    value: string;
    mandatory: boolean;
    onTextChange: (text: string) => void;
    validateField?: ((text: string) => void);
    errors?:string[];
    showIcon?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
        label, 
        value, 
        onTextChange, 
        validateField,
        mandatory=false, 
        showIcon=false, 
        errors=[]
    }) => {
    
    const [isTextMasked, setIsTextMasked] = useState(showIcon);
    
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
                {mandatory ? <Text style={styles.mandatory}>*</Text> : null }
            </View>
            <View>
                <TextInput 
                    style={styles.input} 
                    value={value} 
                    onChangeText={onTextChange} 
                    autoCapitalize={"none"} 
                    autoCorrect={false}
                    secureTextEntry={isTextMasked}
                    onBlur={validateField ? (e) => validateField(e.nativeEvent.text) : undefined}
                />
                {showIcon && 
                    <TouchableOpacity 
                        onPress={() => setIsTextMasked(!isTextMasked) }
                        style={styles.icon}
                    >
                        {isTextMasked ?
                            <AntDesign name="eye" size={24} color="black" /> : 
                            <AntDesign name="eyeo" size={24} color="black" /> }
                    </TouchableOpacity> }
                {errors.map((error) => (
                    <Text key={error} style={[fontStyles.L3, styles.error]}>
                        {error}
                    </Text>
                ))}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 4
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mandatory: {
        color: '#2A584F',
    },
    error: {
        color: '#2A584F',
    },
    input: {
        ...fontStyles.B3,
        backgroundColor: 'white', 
        paddingHorizontal: 12,
        borderRadius: 4,
        borderColor: '#2A584F',
        borderWidth: 2,
        height: 48
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 12, 
        zIndex: 1,
    }
})

export default TextField;