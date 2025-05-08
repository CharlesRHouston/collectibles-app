import {StyleSheet, Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";

interface TextAreaFieldProps {
    label: string;
    mandatory?: boolean;
}

const TextAreaField : React.FC<TextAreaFieldProps> = ({ label, mandatory=false }) => {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
                {mandatory ? <Text style={styles.mandatory}>*</Text> : null }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mandatory: {
        color: '#2A584F',
    }
})

export default TextAreaField;