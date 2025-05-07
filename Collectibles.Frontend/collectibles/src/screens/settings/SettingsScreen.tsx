import React, {useContext, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Button from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../../../App";
import Loading from "../../components/Loading";
import Setting from "../../components/Setting";
import {useNavigation} from "@react-navigation/native";
import {SettingsStackList} from "../../types/StackParamList";
import {StackNavigationProp} from "@react-navigation/stack";
import Screen from "../../components/Screen";
import {HttpRequest, HttpResponse} from "../../types/Api";
import {AuthenticationResponse, LoginRequest, RefreshRequest} from "../../types/Authentication";
import axios, {AxiosResponse} from "axios";
import authenticatedApi from "../../api/authenticatedApi";

const SettingsScreen: React.FC = () => {

    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<SettingsStackList, 'Settings'>>();
    
    const onSignOut = async () => {
        try {
            setLoading(true);
            const response = await authenticatedApi.post<
                void,
                AxiosResponse<void>,
                HttpRequest<RefreshRequest>>("/api/v1/auth/logout", {
                data: {
                    refreshToken: await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY)
                }
            });
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
    };
    
    return (<>
        {
            loading && <Loading />
        }
        <Screen title={"Settings"} backNavigation={false} >
            <ScrollView contentContainerStyle={{gap: 24}}>
                <Setting 
                    label={"Change Password"} 
                    onPress={() => navigation.navigate('ChangePassword')}
                />
                <Setting
                    label={"Change Username"}
                    onPress={() => navigation.navigate('ChangeUsername')}
                />
                <View style={{alignItems: 'center'}}>
                    <Button
                        label={"Sign out"}
                        type={'secondary'}
                        onPress={onSignOut} />
                </View>
            </ScrollView>
        </Screen>
    </>)
}

export default SettingsScreen;