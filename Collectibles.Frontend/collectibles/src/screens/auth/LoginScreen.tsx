import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import TextField from "../../components/fields/TextField";
import Button from "../../components/Button";
import {LoginForm} from "../../types/authentication";
import {AuthContext} from "../../../App";
import Screen from "../../components/Screen";
import AuthenticationService from "../../services/authenticationService";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Loading from "../../components/Loading";

const LoginScreen: React.FC = () => {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: { value: "", errors: [] },
        password: { value: "", errors: [] },
        apiErrors: []
    });
    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(AuthContext);

    const onSubmitLogin = async () : Promise<void> => {
        setLoading(true);
        
        try {
            const response = await AuthenticationService.login({
                email: loginForm.email.value,
                password: loginForm.password.value
            });

            if (response.status === 200) {
                await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, response.data.data.refreshToken);
                await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY, response.data.data.accessToken);
                dispatch({type: 'SIGN_IN'});
            }

            setLoginForm({...loginForm, apiErrors: []});
        } catch (error) {
            let errorMessage = "An unexpected error occurred.";

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    errorMessage = error.message;
                } else if (!error.response) {
                    errorMessage = "An unexpected error occurred. Please check your connection.";
                }
            }

            setLoginForm({ ...loginForm, apiErrors: [errorMessage] });
        } finally {
            setLoading(false);
        }
    };
    
    return (<>
        {
            loading &&  <Loading />
        }
        <Screen
            title={"Log in to your account"}
            backNavigation={true}
            dismissKeyboard={true}
        >
            <View style={styles.textInputContainer}>
                <TextField
                    label={"Email"}
                    value={loginForm.email.value}
                    mandatory={true}
                    onTextChange={(text) => setLoginForm({...loginForm, email: { value: text, errors: loginForm.email.errors }})}
                />
                <TextField
                    label={"Password"}
                    value={loginForm.password.value}
                    mandatory={true}
                    onTextChange={(text) => setLoginForm({...loginForm, password: { value: text, errors: loginForm.password.errors }})}
                    hideIcon={true}
                />
            </View>
            <Button
                type={"primary"}
                label="Log in"
                onPress={async () => {await onSubmitLogin()}
                }/>
        </Screen>
    </>)
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'flex-start',
        paddingVertical: 56,
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 32
    },
    textInputContainer: {
        gap: 8,
        alignItems: 'stretch',
        width: '100%',
        paddingHorizontal: 16,
    }
})

export default LoginScreen;