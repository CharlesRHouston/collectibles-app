import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import React, { useState } from 'react';

/*
import DatePicker from "react-native-date-picker";

<DatePicker
    date={date}
    open={isOpen}
    onConfirm={(date) => {
        setDate(date);
        setIsOpen(false);
    }}
    onCancel={() => {
        setIsOpen(false)
    }}
/> 
*/

interface DateFieldProps {
    label: string;
    mandatory?: boolean;
}

const DateField : React.FC<DateFieldProps> = ({ label, mandatory=false }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
                {mandatory ? <Text style={styles.mandatory}>*</Text> : null }
            </View>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
                <View style={styles.input}>
                    <Image
                        source={require('../../../assets/icons/Icon - Calendar.png')}
                    />
                    <Text style={fontStyles.B3}>{date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    })}</Text>
                </View>
            </TouchableOpacity>
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
    mandatory: {
        color: '#2A584F',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        borderRadius: 4,
        borderColor: '#2A584F',
        borderWidth: 2,
        height: 48,
        gap: 16
    },
    text: {
        ...fontStyles.B3,
    }
})

export default DateField;