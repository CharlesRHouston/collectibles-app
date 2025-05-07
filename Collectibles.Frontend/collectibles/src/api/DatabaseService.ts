import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import * as SecureStore from "expo-secure-store";
import AuthenticationService from "./AuthenticationService";
import {HttpResponse} from "../types/Api";
import {GetUserResponse, UpdateUserRequest} from "../types/Profile";
import {RefreshRequest} from "../types/Authentication";

interface IDataBaseService {
    logout(request : RefreshRequest): Promise<void>;
    getUser(): Promise<AxiosResponse<HttpResponse<GetUserResponse>>>;
    updateUser(request: UpdateUserRequest) : Promise<AxiosResponse>;
}

class DatabaseService implements IDataBaseService {
    private readonly api: AxiosInstance;
    
    constructor() {
        this.api = axios.create({
            baseURL: process.env.EXPO_PUBLIC_BASE_URL
        })

        this.api.interceptors.request.use(async (config) => {
            const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.api.interceptors.response.use(response => response,
            async (error: AxiosError) => {
                const originalRequest = error.config as any;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshToken = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY!);
                        if (!refreshToken) throw new Error("No refresh token available");
                        
                        const response = await AuthenticationService.refresh({ 
                            refreshToken 
                        });

                        await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY, response.data.data.accessToken);
                        await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY, response.data.data.refreshToken);

                        originalRequest.headers.Authorization = `Bearer ${(response.data.data.accessToken)}`;

                        return this.api(originalRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed:", refreshError);
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
    
    getUser = async () => {
        return await this.api.get<HttpResponse<GetUserResponse>>("api/v1/user");
    }
    
    logout = async (request : RefreshRequest) => {
        await this.api.post("api/v1/auth/logout", {
            data: request
        });
    }
    
    updateUser = async (request : UpdateUserRequest) => {
        return await this.api.patch("api/v1/user", {
            data: request
        });
    }
}

export default new DatabaseService();