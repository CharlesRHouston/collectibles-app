import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {UserCollectible} from "../types/userCollectible";

export interface UserCollectibleContextType {
    userCollectibles: UserCollectible[] | null;
    setUserCollectibles: Dispatch<SetStateAction<UserCollectible[] | null>>;
}

export const UserCollectibleContext = createContext<UserCollectibleContextType | null>(null);
export const useUserCollectibleContext = () => {
    const context = useContext(UserCollectibleContext);
    if (!context) {
        throw new Error("useUserCollectibleContext must be used within a UserCollectibleProvider");
    }
    return context;
};