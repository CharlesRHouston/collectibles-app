import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {AuthAction} from "../../types/authentication";
import ApiService from "../../services/apiService";

export const onSubmitSignout = async (
    setLoading: (value: React.SetStateAction<boolean>) => void,
    dispatch: React.Dispatch<AuthAction>
) : Promise<void> => {
    try {
        setLoading(true);
        await ApiService.logout({
            refreshToken: await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY)
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.status, error.response?.data);
        } else {
            console.error("Unexpected error:", error);
        }
    } finally {
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY);
        dispatch({ type: "SIGN_OUT"});
        setLoading(false);
    }
}