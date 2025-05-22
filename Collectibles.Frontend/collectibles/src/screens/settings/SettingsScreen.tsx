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
import {buttonContainerStyles} from "../../styles/buttonStyles";
import ApiService from "../../services/apiService";
import axios from "axios";

const SettingsScreen: React.FC = () => {
    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<SettingsStackList, 'Settings'>>();

    const onSubmitSignout = async () : Promise<void> => {
        try {
            setLoading(true);
            await ApiService.logout({
                refreshToken: await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY)
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.status, error.response?.data);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY);
            dispatch({ type: "SIGN_OUT"});
            setLoading(false);
        }
    }
    
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
                        onPress={async () => await onSubmitSignout()} />
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