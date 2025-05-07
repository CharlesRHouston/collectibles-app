import React, {createContext, useContext} from "react";
import {ProfileContextType} from "../types/Profile";

export const ProfileContext = createContext<ProfileContextType | null>(null);
export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileProvider");
    }
    return context;
};