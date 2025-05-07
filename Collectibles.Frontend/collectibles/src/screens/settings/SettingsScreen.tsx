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
import DatabaseService from "../../api/DatabaseService";
import {onSubmitSignout} from "../../utils/auth/onSubmitSignout";

const SettingsScreen: React.FC = () => {
    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<SettingsStackList, 'Settings'>>();
    
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
                        onPress={() => onSubmitSignout(setLoading, dispatch)} />
                </View>
            </ScrollView>
        </Screen>
    </>)
}

export default SettingsScreen;