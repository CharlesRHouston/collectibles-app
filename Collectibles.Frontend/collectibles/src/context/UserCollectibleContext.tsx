import React, {createContext, useContext} from "react";
import {UserCollectible} from "../types/UserCollectible";

export interface UserCollectibleContextType {
    userCollectibles: UserCollectible[] | null;
    setUserCollectibles: React.Dispatch<React.SetStateAction<UserCollectible[] | null>>;
}

export const UserCollectibleContext = createContext<UserCollectibleContextType | null>(null);
export const useUserCollectibleContext = () => {
    const context = useContext(UserCollectibleContext);
    if (!context) {
        throw new Error("useUserCollectibleContext must be used within a UserCollectibleProvider");
    }
    return context;
};