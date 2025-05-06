import React from "react";

export interface AuthenticationResponse {
    accessToken: string;
    refreshToken: string;
}

interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface LoginRequest extends AuthenticationRequest {
    
}

export interface SignupRequest extends AuthenticationRequest {
    username: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export type AuthState = {
    isLoading: boolean;
    isSignedIn: boolean;
    isConnectionError: boolean;
};

export type AuthAction =
    | { type: 'SIGN_OUT' }
    | { type: 'SIGN_IN' }
    | { type: 'CONNECTION_ERROR' }

export interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

type FieldState = {
    value: string;
    errors: string[];
};

export interface LoginForm {
    email: FieldState;
    password: FieldState;
    apiErrors: string[]
}

export interface SignupForm {
    email: FieldState;
    password: FieldState;
    confirmPassword: FieldState;
    username: FieldState;
    apiErrors: string[]
}