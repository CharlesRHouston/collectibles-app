import {useEffect, useState} from "react";
import {Profile, ProfileResponse} from "../types/Profile";
import {ProfileContext} from "./ProfileProvider";
import Loading from "../components/Loading";
import {HttpResponse} from "../types/Api";
import authenticatedApi from "../api/authenticatedApi";

interface BootstrapProviderProps {
    children: React.ReactNode;
}

export const BootstrapProvider: React.FC<BootstrapProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<Profile | null>(null);
    
    useEffect(() => {
        const FetchAllData = async () => {
            try {
                const [profile] = await Promise.all([
                    authenticatedApi.get<HttpResponse<ProfileResponse>>("api/v1/user")
                ]);
                
                setProfile(profile.data.data);
            } catch (error) {
                console.error("Bootstrap fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        FetchAllData();
    }, [])

    if (loading) return <Loading />;
    
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}