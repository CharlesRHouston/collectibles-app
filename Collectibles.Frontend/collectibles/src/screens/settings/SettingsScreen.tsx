import React, {useContext, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Button from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../../../App";
import Loading from "../../components/Loading";
import {screenStyles} from "../../styles/screenStyles";
import {fontStyles} from "../../styles/fontStyles";
import Setting from "../../components/Setting";
import {useNavigation} from "@react-navigation/native";
import {SettingsStackList} from "../../types/StackParamList";
import {StackNavigationProp} from "@react-navigation/stack";

const SettingsScreen: React.FC = () => {

    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<SettingsStackList, 'Settings'>>();
    
    const onSignOut = async () => {
        setLoading(true);
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY);
        dispatch({ type: "SIGN_OUT"});
        setLoading(false);
    };
    
    return (<>
        {
            loading && <Loading />
        }
        <View style={screenStyles.containerWithoutNavigation}>
            <Text style={fontStyles.H3}>
                Settings
            </Text>
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
        </View>
    </>)
}

export default SettingsScreen;