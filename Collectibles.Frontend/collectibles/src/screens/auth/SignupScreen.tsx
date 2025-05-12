import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {fontStyles} from "../../styles/fontStyles";
import TextField from "../../components/fields/TextField";
import Button from "../../components/Button";
import {SignupForm} from "../../types/authentication";
import {AuthContext} from "../../../App";
import {onSubmitSignup} from "../../utils/auth/onSubmitSignup";
import {ValidateConfirmPassword, ValidatePassword} from "../../utils/validation/validatePassword";
import Loading from "../../components/Loading";
import Screen from "../../components/Screen";

const SignupScreen: React.FC = () => {
    const [signupForm, setSignupForm] = useState<SignupForm>({
        email: { value: "", errors: [] },
        password: { value: "", errors: [] },
        confirmPassword: { value: "", errors: [] },
        username: { value: "", errors: [] },
        apiErrors: []
    });

    const [loading, setLoading] = useState(false);
    const {state, dispatch} = useContext(AuthContext);

    return (<>
        {
            loading &&  <Loading />
        }
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
        >
            <Screen title={"Create a new account"} backNavigation={true} dismissKeyboard={true}>
                <ScrollView 
                    contentContainerStyle={{gap: 32}}
                    style={styles.scrollView}
                >
                    <View style={styles.inputContainer}>
                        <TextField
                            label={"Username"}
                            value={signupForm.username.value}
                            mandatory={true}
                            onTextChange={(text) => setSignupForm({...signupForm, username: { value: text, errors: signupForm.username.errors }})}
                            errors={signupForm.username.errors}
                        />
                        <TextField
                            label={"Email"}
                            value={signupForm.email.value}
                            mandatory={true}
                            onTextChange={(text) => setSignupForm({...signupForm, email: { value: text, errors: signupForm.email.errors }})}
                            errors={signupForm.email.errors}
                        />
                        <TextField
                            label={"Password"}
                            value={signupForm.password.value}
                            mandatory={true}
                            onTextChange={(text) => setSignupForm({...signupForm, password: { value: text, errors: signupForm.password.errors }})}
                            showIcon={true}
                            validateField={() => ValidatePassword(signupForm.password, setSignupForm)}
                            errors={signupForm.password.errors}
                        />
                        <TextField
                            label={"Confirm Password"}
                            value={signupForm.confirmPassword.value}
                            mandatory={true}
                            onTextChange={(text) => setSignupForm({...signupForm, confirmPassword: { value: text, errors: signupForm.confirmPassword.errors }})}
                            showIcon={true}
                            validateField={() => ValidateConfirmPassword(signupForm.password, signupForm.confirmPassword, setSignupForm)}
                            errors={signupForm.confirmPassword.errors}
                        />
                    </View>
                    <View style={{gap: 8, flexDirection: 'column', alignItems: 'center'}}>
                        <Button
                            type={"primary"}
                            label="Create Account"
                            onPress={async () => {
                                setLoading(true);
                                await onSubmitSignup(signupForm, setSignupForm, dispatch);
                                setLoading(false);
                            }
                            }/>
                        {signupForm.apiErrors.map((error) => (
                            <Text key={error} style={styles.error}>
                                {error}
                            </Text>
                        ))}
                    </View>
                </ScrollView>
            </Screen>
        </KeyboardAvoidingView>
    </>);
}

const styles = StyleSheet.create({
    error: {
        ...fontStyles.L3,
        color: '#2A584F'
    },
    inputContainer: { 
        gap: 8, 
        flexDirection: 'column', 
        justifyContent: 'center' 
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        width: '100%'
    }
})

export default SignupScreen;