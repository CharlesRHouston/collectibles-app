import {AuthenticationResponse, LoginRequest, RefreshRequest, SignupRequest} from "../types/Authentication";
import {HttpRequest, HttpResponse} from "../types/Api";
import axios, {AxiosInstance, AxiosResponse} from "axios";

interface IAuthenticationService {
    login(request: LoginRequest) : Promise<AxiosResponse<HttpResponse<AuthenticationResponse>>>;
    signup(request: SignupRequest) : Promise<AxiosResponse<HttpResponse<AuthenticationResponse>>>;
    refresh(request: RefreshRequest) : Promise<AxiosResponse<HttpResponse<AuthenticationResponse>>>;
}

class AuthenticationService implements IAuthenticationService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: process.env.EXPO_PUBLIC_BASE_URL
        });
    }
    
    login = async (request: LoginRequest) : Promise<AxiosResponse<HttpResponse<AuthenticationResponse>>> => {
        return await this.api.post<
            HttpResponse<AuthenticationResponse>,
            AxiosResponse<HttpResponse<AuthenticationResponse>>,
            HttpRequest<LoginRequest>
        >("/api/v1/auth/login", {
            data: {
                email: request.email,
                password: request.password
            }
        });
    }
    
    signup = async (request: SignupRequest) => {
        return await this.api.post<
            HttpResponse<AuthenticationResponse>,
            AxiosResponse<HttpResponse<AuthenticationResponse>>,
            HttpRequest<SignupRequest>
        >("/api/v1/auth/signup", {
            data: {
                email: request.email,
                password: request.password,
                username: request.username
            }
        });
    }

    refresh = async (request: RefreshRequest) => {
        return await this.api.post<
            HttpResponse<AuthenticationResponse>,
            AxiosResponse<HttpResponse<AuthenticationResponse>>,
            HttpRequest<RefreshRequest>
        >("/api/v1/auth/refresh", {
            data: {
                refreshToken: request.refreshToken
            }
        });
    }
}

export default new AuthenticationService();