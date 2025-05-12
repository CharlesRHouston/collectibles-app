import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Button from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../../../App";
import Loading from "../../components/Loading";
import Setting from "../../components/Setting";
import {useNavigation} from "@react-navigation/native";
import {SettingsStackList} from "../../types/stackParamList";
import {StackNavigationProp} from "@react-navigation/stack";
import Screen from "../../components/Screen";
import {onSubmitSignout} from "../../utils/auth/onSubmitSignout";
import {buttonContainerStyles} from "../../styles/buttonStyles";

const SettingsScreen: React.FC = () => {
    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<SettingsStackList, 'Settings'>>();
    
    return (<>
        {
            loading && <Loading />
        }
        <Screen title={"Settings"} backNavigation={false} >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Setting
                    label={"Change Username"}
                    onPress={() => navigation.navigate('ChangeUsername')}
                />
                <Setting 
                    label={"Change Password"} 
                    onPress={() => navigation.navigate('ChangePassword')}
                />
                <View style={buttonContainerStyles.single}>
                    <Button
                        label={"Sign out"}
                        type={'secondary'}
                        onPress={() => onSubmitSignout(setLoading, dispatch)} />
                </View>
            </ScrollView>
        </Screen>
    </>)
}

const styles = StyleSheet.create({
    scrollView: {
        gap: 24
    }
})

export default SettingsScreen;