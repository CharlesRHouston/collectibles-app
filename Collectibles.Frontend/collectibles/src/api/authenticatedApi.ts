import axios, {AxiosError, AxiosResponse} from "axios";
import * as SecureStore from "expo-secure-store";
import publicApi from "./publicApi";
import {HttpRequest, HttpResponse} from "../types/Api";
import {AuthenticationResponse, RefreshRequest} from "../types/Authentication";

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL
});

instance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY!);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await SecureStore.getItemAsync(process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY!);
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await publicApi.post<
              HttpResponse<AuthenticationResponse>,
              AxiosResponse<HttpResponse<AuthenticationResponse>>,
              HttpRequest<RefreshRequest>
          >(
              '/api/v1/auth/refresh',
              { data: { refreshToken } },
              { validateStatus: status => status < 300 }
          );

          await SecureStore.setItemAsync(process.env.EXPO_PUBLIC_ACCESS_TOKEN_KEY!, response.data.data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${(response.data.data.accessToken)}`;
          
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
);

instance.interceptors.response.use()

export default instance;