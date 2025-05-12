import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {fontStyles} from "../styles/fontStyles";
import React from "react";

interface SettingProps {
    label: string,
    onPress: () => void,
}

const Setting : React.FC<SettingProps> = ({label, onPress}) => {
    return <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <Text style={fontStyles.L2}>{label}</Text>
            <Image
                source={require('../../assets/images/icons/Arrow - Green.png')}
                style={styles.image}
            />
        </View>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 8
    },
    icon: {
        padding: 12
    },
    image: {
        transform: [{ rotate: '135deg' }]
    }
})

export default Setting;