import React, {useState} from 'react';
import {Keyboard, Text, TouchableWithoutFeedback, View} from 'react-native';
import Loading from "../../components/Loading";
import TextField from "../../components/TextField";
import Screen from "../../components/Screen";
import Button from "../../components/Button";
import DatabaseService from "../../api/DatabaseService";
import {ValidateConfirmPassword, ValidatePassword} from "../../utils/validation/validatePassword";
import {PasswordForm, SignupForm} from "../../types/Authentication";
import {useNavigation} from "@react-navigation/native";

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
        <Screen title="Change Password " backNavigation={true} dismissKeyboard={true}>
            <View style={{width: '100%', gap: 8}} >
                <TextField
                    label={"New password"}
                    value={passwordForm.password.value}
                    mandatory={true}
                    showIcon={true}
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
                    showIcon={true}
                    mandatory={true}
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
            <View style={{alignItems: 'center'}}>
                <Button
                    label="Change Password"
                    type="primary"
                    onPress={async () => {
                        setLoading(true);
                        await DatabaseService.updateUser({
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

export default ChangePasswordScreen;