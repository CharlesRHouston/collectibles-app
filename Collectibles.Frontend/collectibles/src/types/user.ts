import React from "react";
import {AuthAction, AuthState} from "./Authentication";

export interface User {
    id: string;
    username: string;
    email: string;
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