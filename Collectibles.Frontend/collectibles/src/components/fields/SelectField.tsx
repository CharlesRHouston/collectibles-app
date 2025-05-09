import {StyleSheet, Text, View} from "react-native";
import {fontStyles} from "../../styles/fontStyles";
import { Dropdown } from 'react-native-element-dropdown';

interface SelectFieldProps {
    label: string;
    data: DropdownData[];
    placeholder: string;
    mandatory?: boolean;
    value?: string;
    setValue: (value: string) => void;
}

export interface DropdownData {
    label: string;
    value: string;
}

const SelectField : React.FC<SelectFieldProps> = ({ label, placeholder, data, value, setValue, mandatory=false }) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <Text style={fontStyles.L3}>{label}</Text>
                {mandatory ? <Text style={styles.mandatory}>*</Text> : null }
            </View>
            <View style={styles.input}>
                <Dropdown 
                    data={data} 
                    value={value}
                    labelField={"label"}
                    valueField={"value"}
                    placeholder={placeholder}
                    onChange={item => {
                        setValue(item?.value);
                    }}
                    selectedTextStyle={styles.text}
                    inputSearchStyle={styles.text}
                    placeholderStyle={styles.text}
                    renderItem={(item) => {
                        return <View style={styles.dropdownItem}>
                            <Text style={styles.text}>{item.label}</Text>
                        </View>
                    }
                }/>
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
    mandatory: {
        color: '#2A584F',
    },
    input: {
        alignItems: 'stretch',
        justifyContent: 'center',
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
    },
    dropdownItem: {
        flex: 1, 
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})

export default SelectField;