import {HttpRequest, HttpResponse} from "../../types/Api";
import {AuthAction, AuthenticationResponse, LoginForm, LoginRequest, RefreshRequest} from "../../types/Authentication";
import axios, {AxiosResponse} from "axios";
import * as SecureStore from "expo-secure-store";
import publicApi from "../../api/publicApi";

export const onSubmitLogin = async (
        loginForm: LoginForm,
        setLoginForm: React.Dispatch<React.SetStateAction<LoginForm>>,
        dispatch: React.Dispatch<AuthAction>
    ) : Promise<void> => {
    try {
        const response = await publicApi.post<
            HttpResponse<AuthenticationResponse>,
            AxiosResponse<HttpResponse<AuthenticationResponse>>,
            HttpRequest<LoginRequest>
        >("/api/v1/auth/login", {
            data: {
                email: loginForm.email.value,
                password: loginForm.password.value
            }
        })
        
        if (response.status === 200) {
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, response.data.data.refreshToken);
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY, response.data.data.accessToken);
            dispatch({type: 'SIGN_IN'});
        }
        
        setLoginForm({...loginForm, apiErrors: []});
    } catch (error) {
        let errorMessage = "An unexpected error occurred.";

        console.error(errorMessage);

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
                errorMessage = error.message;
            } else if (!error.response) {
                errorMessage = "An unexpected error occurred. Please check your connection.";
            }
        }

        setLoginForm({ ...loginForm, apiErrors: [errorMessage] });
    }
};