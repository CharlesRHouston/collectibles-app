import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import * as SecureStore from "expo-secure-store";
import AuthenticationService from "./authenticationService";
import {HttpResponse} from "../types/api";
import {GetUserResponse, UpdateUserRequest} from "../types/user";
import {RefreshRequest} from "../types/authentication";
import {Collection} from "../types/collection";
import {PutCollectibleRequest, UserCollectible} from "../types/userCollectible";
import {GetPresignedUrlResponse} from "../types/image";

interface IDataBaseService {
    logout(request : RefreshRequest): Promise<AxiosResponse>;
    getUser(): Promise<AxiosResponse<HttpResponse<GetUserResponse>>>;
    updateUser(request: UpdateUserRequest) : Promise<AxiosResponse>;
    getAllCollections() : Promise<AxiosResponse<HttpResponse<Collection[]>>>
    putCollectible(collectibleId: string, request: PutCollectibleRequest) : Promise<AxiosResponse>;
    getAllUserCollectibles() : Promise<AxiosResponse<HttpResponse<UserCollectible[]>>>;
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

    logout = async (request : RefreshRequest) => {
        return await this.api.post("api/v1/auth/logout", {
            data: request
        });
    }

    getUser = async () => {
        return await this.api.get<HttpResponse<GetUserResponse>>("api/v1/user");
    }

    updateUser = async (request : UpdateUserRequest) => {
        return await this.api.patch("api/v1/user", {
            data: request
        });
    }

    getAllCollections = async () => {
        return await this.api.get<HttpResponse<Collection[]>>("api/v1/collection/all");
    }

    getAllUserCollectibles = async () => {
        return await this.api.get<HttpResponse<UserCollectible[]>>("api/v1/user/collectible/all");
    }

    putCollectible = async (collectibleId: string, collectible: PutCollectibleRequest) => {
        return await this.api.put(`api/v1/user/collectible/${collectibleId}`, {
            data: collectible
        });
    }
    
    getSignedUrlForUpload = async (collectibleId: string) => {
        return await this.api.post<HttpResponse<GetPresignedUrlResponse>>('api/v1/image/upload', {
            data: {
                collectibleId
            }
        });
    }

    getSignedUrlForDownload = async (collectibleId: string) => {
        return await this.api.post<HttpResponse<GetPresignedUrlResponse>>('api/v1/image/download', {
            data: {
                collectibleId
            }
        });
    }
}

export default new DatabaseService();