import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {useNavigation} from "@react-navigation/native";
import {AuthStackList } from "../../types/StackParamList";
import type {StackNavigationProp} from "@react-navigation/stack";
import {screenStyles} from "../../styles/screenStyles";
import {fontStyles} from "../../styles/fontStyles";

type AuthScreenNavProp = StackNavigationProp<AuthStackList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<AuthScreenNavProp>();
    
    return (
        <View style={[screenStyles.screen, styles.screen]}>
            <Text style={fontStyles.H2}>
                Welcome!
            </Text>
            <View style={{ gap: 8 }}>
                <Button 
                    type={'primary'} 
                    label="Sign Up" 
                    onPress={() => navigation.navigate('Signup') } 
                />
                <Button
                    type={'secondary'}
                    label="Log in" 
                    onPress={() => navigation.navigate('Login') } 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        gap: 48,
    }
})

export default WelcomeScreen;