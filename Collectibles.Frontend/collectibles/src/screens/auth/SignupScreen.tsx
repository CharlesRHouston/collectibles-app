import React, {useContext, useState} from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList
} from 'react-native';
import {screenStyles} from "../../styles/screenStyles";
import {fontStyles} from "../../styles/fontStyles";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import BackArrow from "../../components/BackArrow";
import {SignupForm} from "../../types/Authentication";
import {AuthContext} from "../../../App";
import {onSubmitSignup} from "../../utils/auth/onSubmitSignup";
import {ValidateConfirmPassword, ValidatePassword} from "../../utils/validation/validatePassword";
import Loading from "../../components/Loading";

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
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.contentContainer}>
                    <BackArrow />
                    <Text style={fontStyles.H3}>
                        Create a new account
                    </Text>
                    <ScrollView 
                        contentContainerStyle={{gap: 32}}
                        style={{width: '100%'}}
                    >
                        <View style={{ gap: 8, flexDirection: 'column', justifyContent: 'center' }}>
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
                                validateField={() => ValidatePassword(signupForm, setSignupForm)}
                                errors={signupForm.password.errors}
                            />
                            <TextField
                                label={"Confirm Password"}
                                value={signupForm.confirmPassword.value}
                                mandatory={true}
                                onTextChange={(text) => setSignupForm({...signupForm, confirmPassword: { value: text, errors: signupForm.confirmPassword.errors }})}
                                showIcon={true}
                                validateField={() => ValidateConfirmPassword(signupForm, setSignupForm)}
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
                                <Text key={error} style={[fontStyles.L3, styles.error]}>
                                    {error}
                                </Text>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </>);
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#6EB8A8',
        paddingTop: 56,
        paddingHorizontal: 16,
        gap: 32
    },
    textInputContainer: {
        gap: 8,
        alignItems: 'stretch',
        width: '100%',
        paddingHorizontal: 16,
    },
    error: {
        color: '#2A584F'
    },
})

export default SignupScreen;