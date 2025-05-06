import {jwtDecode, JwtPayload} from "jwt-decode";

export const ValidateAccessTokenExpiration = (accessToken: string) : boolean => {
    try {
        const decoded = jwtDecode<JwtPayload>(accessToken);

        if (!decoded.exp) {
            return false;
        }

        return decoded.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
        return false;
    }
}