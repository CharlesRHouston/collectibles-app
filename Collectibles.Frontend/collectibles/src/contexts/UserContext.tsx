import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {User} from "../types/user";

export interface UserContextType {
    user: User|null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
};