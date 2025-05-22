import React, {useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Loading from "../../components/Loading";
import TextField from "../../components/fields/TextField";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import ApiService from "../../services/apiService";
import {ValidateConfirmPassword, ValidatePassword} from "../../utils/validation/validatePassword";
import {PasswordForm, SignupForm} from "../../types/authentication";
import {useNavigation} from "@react-navigation/native";
import {buttonContainerStyles} from "../../styles/buttonStyles";

const ChangePasswordScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        password: { value: "", errors: [] },
        confirmPassword: { value: "", errors: [] },
    });
    const navigation = useNavigation();

    //TODO: current password
    return (<>
        {
            loading &&  <Loading />
        }
        <Screen 
            title="Change Password" 
            backNavigation={true} 
            dismissKeyboard={true}
        >
            <View style={styles.inputContainer} >
                <TextField
                    label={"New password"}
                    value={passwordForm.password.value}
                    mandatory={false}
                    hideIcon={true}
                    validateField={() => ValidatePassword(passwordForm.password, setPasswordForm)}
                    onTextChange={(text) => setPasswordForm({
                        ...passwordForm, 
                        password: { 
                            value: text, 
                            errors: passwordForm.password.errors 
                        }
                    })}
                    errors={passwordForm.password.errors}
                />
                <TextField
                    label={"Confirm new password"}
                    value={passwordForm.confirmPassword.value}
                    hideIcon={true}
                    mandatory={false}
                    validateField={() => ValidateConfirmPassword(passwordForm.password, passwordForm.confirmPassword, setPasswordForm)}
                    onTextChange={(text) => setPasswordForm({
                        ...passwordForm,
                        confirmPassword: {
                            value: text,
                            errors: passwordForm.confirmPassword.errors
                        }
                    })}
                    errors={passwordForm.confirmPassword.errors}
                />
            </View>
            <View style={buttonContainerStyles.single}>
                <Button
                    label="Change Password"
                    type="primary"
                    onPress={async () => {
                        setLoading(true);
                        await ApiService.updateUser({
                            password: passwordForm.password.value,
                        });
                        setLoading(false);
                        navigation.goBack();
                    }}
                />
            </View>
        </Screen>
    </>)
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%', 
        gap: 8
    }
});

export default ChangePasswordScreen;