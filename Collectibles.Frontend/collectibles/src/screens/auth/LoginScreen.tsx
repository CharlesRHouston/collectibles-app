import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback} from 'react-native';
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import {LoginForm} from "../../types/Authentication";
import {AuthContext} from "../../../App";
import {onSubmitLogin} from "../../utils/auth/onSubmitLogin";
import Screen from "../../components/Screen";

const LoginScreen: React.FC = () => {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: { value: "", errors: [] },
        password: { value: "", errors: [] },
        apiErrors: []
    });
    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(AuthContext);
    
    if (loading) {
        return <Text>Loading...</Text>;
    }
    
    return (
        <Screen title={"Log in to your account"} backNavigation={true} dismissKeyboard={true}>
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
                    showIcon={true}
                />
            </View>
            <Button 
                type={"primary"} 
                label="Log in" 
                onPress={ async () => {
                    setLoading(true);
                    await onSubmitLogin(loginForm, setLoginForm, dispatch);
                    setLoading(false);
                }
            }/>
        </Screen>
    )
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