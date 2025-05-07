import {AuthAction, AuthenticationResponse, RefreshRequest} from "../../types/Authentication";
import * as SecureStore from "expo-secure-store";
import axios, {AxiosResponse} from "axios";
import React from "react";
import AuthenticationService from "../../api/AuthenticationService";

export const RefreshAuthenticationTokens = async (dispatch:  React.Dispatch<AuthAction>, refreshToken: string) => {
    try {
        const response = await AuthenticationService.refresh({
            refreshToken
        });

        if (response.status === 200) {
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, response.data.data.refreshToken);
            await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY, response.data.data.accessToken);
            dispatch({ type: 'SIGN_IN' })
        }
    } catch (error) {
        if (axios.isAxiosError(error)){
            if (error.status === 401) {
                await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);
                await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY);
                dispatch({ type: 'SIGN_OUT' });
            } else if (error.status === 404 || !error.response) {
                console.error("Connection error:", error.message);
                dispatch({ type: 'CONNECTION_ERROR' });
            } else {
                console.error("Unexpected server error:", error.response.status);
            }
        } else {
            console.error("Unexpected server error.");
        }
    }
}