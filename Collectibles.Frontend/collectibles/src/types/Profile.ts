import React from "react";
import {AuthAction, AuthState} from "./Authentication";

export interface Profile {
    id: string;
    username: string;
    email: string;
}

export interface ProfileContextType {
    profile: Profile|null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

export interface GetUserResponse {
    id: string;
    username: string;
    email: string;
}

export interface UpdateUserRequest {
    email?: string;
    username?: string;
    password?: string;
}