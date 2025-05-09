import {CollectContext, CollectForm} from "./CollectContext";
import {useState} from "react";

interface CollectProviderProps {
    children: React.ReactNode;
}

export const CollectProvider: React.FC<CollectProviderProps> = ({ children }) => {
    const [collectForm, setCollectForm] = useState<CollectForm>({
        collection: null,
        collectible: null,
        imageUrl: null,
        dateCollected: null,
        bonus: null,
        description: null
    });
    
    return (
        <CollectContext.Provider value={{ form: collectForm, setForm: setCollectForm}}>
            {children}
        </CollectContext.Provider>
    );
}