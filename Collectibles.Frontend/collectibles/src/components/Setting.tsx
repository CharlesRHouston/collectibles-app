import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../styles/fontStyles";
import React from "react";

interface SettingProps {
    label: string,
    onPress: () => void,
}

const Setting : React.FC<SettingProps> = ({label, onPress}) => {
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.setting}>
            <Text style={fontStyles.L2}>{label}</Text>
            <Image
                source={require('../../assets/icons/Navigation - Back Arrow (Green).png')}
                style={{ transform: [{ rotate: '135deg' }] }}
            />
        </View>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    setting: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 8
    },
    icon: {
        padding: 12
    }
})

export default Setting;