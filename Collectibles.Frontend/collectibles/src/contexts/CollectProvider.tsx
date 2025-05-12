import {CollectContext, CollectForm} from "./CollectContext";
import {useState} from "react";

interface CollectProviderProps {
    children: React.ReactNode;
}

export const CollectProvider: React.FC<CollectProviderProps> = ({ children }) => {
    const [collectForm, setCollectForm] = useState<CollectForm>({
        collectionId: null,
        collectibleId: null,
        imageUrl: null,
        dateCollected: new Date(),
        bonus: null,
        description: null
    });
    
    return (
        <CollectContext.Provider value={{ form: collectForm, setForm: setCollectForm}}>
            {children}
        </CollectContext.Provider>
    );
}