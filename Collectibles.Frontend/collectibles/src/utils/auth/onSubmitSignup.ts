
import axios, {AxiosResponse} from "axios";
import * as SecureStore from "expo-secure-store";
import {AuthAction, SignupForm} from "../../types/authentication";
import AuthenticationService from "../../services/authenticationService";

export const onSubmitSignup = async (
    signupForm: SignupForm,
    setSignupForm: React.Dispatch<React.SetStateAction<SignupForm>>,
    dispatch: React.Dispatch<AuthAction>
) : Promise<void> => {
    try {
        const response = await AuthenticationService.signup({
            email: signupForm.email.value,
            password: signupForm.password.value,
            username: signupForm.username.value
        });

        if (response.status === 202) {
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, response.data.data.refreshToken);
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY, response.data.data.accessToken);
            dispatch({type: 'SIGN_IN'});
        }
        
        setSignupForm({...signupForm, apiErrors: []});
    } catch (error) {
        let errorMessage = "An unexpected error occurred.";

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401 || error.response?.status === 409) {
                errorMessage = error.response.data;
            } else if (!error.response) {
                errorMessage = "An unexpected error occurred. Please check your connection.";
            }
        }

        setSignupForm({ ...signupForm, apiErrors: [errorMessage] });
    }
};