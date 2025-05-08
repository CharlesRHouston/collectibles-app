import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import { useState } from 'react';

interface DateFieldProps {
    label: string;
    mandatory?: boolean;
}

const DateField : React.FC<DateFieldProps> = ({ label, mandatory=false }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onChange = (event: any, selectedDate?: Date) => {
        setIsOpen(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };
    
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
                {mandatory ? <Text style={styles.mandatory}>*</Text> : null }
            </View>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <Text>{date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })}</Text>
            </TouchableOpacity>
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

export default DateField;