import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import { useNavigation} from "@react-navigation/native";

const BackArrow: React.FC = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()} >
                <Image
                    source={require('../../assets/icons/Navigation - Back Arrow.png')}
                    style={{ transform: [{ rotate: '-45deg' }] }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    icon: {
        padding: 12
    }
})

export default BackArrow;