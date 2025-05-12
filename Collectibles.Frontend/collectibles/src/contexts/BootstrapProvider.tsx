import {useEffect, useState} from "react";
import {User} from "../types/User";
import {UserContext} from "./UserContext";
import Loading from "../components/Loading";
import ApiService from "../services/ApiService";
import {Collection} from "../types/Collection";
import {UserCollectible} from "../types/UserCollectible";
import {CollectionContext} from "./CollectionContext";
import {UserCollectibleContext} from "./UserCollectibleContext";

interface BootstrapProviderProps {
    children: React.ReactNode;
}

export const BootstrapProvider: React.FC<BootstrapProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [collections, setCollections] = useState<Collection[] | null>(null);
    const [userCollectibles, setUserCollectibles] = useState<UserCollectible[] | null>(null);
    
    useEffect(() => {
        const FetchAllData = async () => {
            try {
                const [user, collections, userCollectibles] = await Promise.all([
                    ApiService.getUser(),
                    ApiService.getAllCollections(),
                    ApiService.getAllUserCollectibles()
                ]);
                
                setUser(user.data.data);
                setCollections(collections.data.data);
                setUserCollectibles(userCollectibles.data.data);
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
        <UserContext.Provider value={{ user, setUser }}>
            <CollectionContext.Provider value={{ collections, setCollections}}>
                <UserCollectibleContext.Provider value={{ userCollectibles, setUserCollectibles}}>
                    {children}
                </UserCollectibleContext.Provider>
            </CollectionContext.Provider>
        </UserContext.Provider>
    )
}