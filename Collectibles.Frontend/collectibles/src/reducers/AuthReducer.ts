import {AuthAction, AuthState} from "../types/authentication";

export const authReducer = (state: AuthState, action: AuthAction) : AuthState => {
    switch (action.type){
        case "SIGN_IN":
            return {
                ...state,
                isLoading: false,
                isSignedIn: true,
                isConnectionError: false
            }
        case "SIGN_OUT":
            return {
                ...state,
                isLoading: false,
                isSignedIn: false,
                isConnectionError: false
            }
        case "CONNECTION_ERROR":
            return {
                ...state,
                isLoading: false,
                isSignedIn: false,
                isConnectionError: true
            }
    }
};