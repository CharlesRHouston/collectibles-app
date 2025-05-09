import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import {AntDesign} from "@expo/vector-icons";

interface TextAreaFieldProps {
    label: string;
    value: string|null;
    onTextChange: (text: string) => void;
}

//TODO: text limit
const TextAreaField : React.FC<TextAreaFieldProps> = ({ label, value, onTextChange }) => {
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    value={value ?? ""}
                    onChangeText={onTextChange}
                    autoCorrect={false}
                    multiline={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 4
    },
    label: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    input: {
        ...fontStyles.B3,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        borderRadius: 4,
        borderColor: '#2A584F',
        borderWidth: 2,
        height: 144,
        paddingTop: 8
    }
})

export default TextAreaField;