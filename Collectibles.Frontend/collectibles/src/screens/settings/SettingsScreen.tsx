import React, {useContext, useState} from 'react';
import { Text } from 'react-native';
import Button from "../../components/Button";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../../../App";
import Loading from "../../components/Loading";

const SettingsScreen: React.FC = () => {

    const {state, dispatch} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    
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
        <Text>
        Welcome to the settings screen.
        </Text>
        <Button 
            label={"Sign out"} 
            type={'primary'} 
            onPress={onSignOut}/>
    </>)
}

export default SettingsScreen;