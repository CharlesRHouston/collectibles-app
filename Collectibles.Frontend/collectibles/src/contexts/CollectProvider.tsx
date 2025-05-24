import {CollectContext, CollectForm} from "./CollectContext";
import {FC, ReactNode, useState} from "react";

interface CollectProviderProps {
    children: ReactNode;
}

export const CollectProvider: FC<CollectProviderProps> = ({ children }) => {
    const [collectForm, setCollectForm] = useState<CollectForm>({
        collectionId: null,
        categoryId: null,
        collectibleId: null,
        imageUri: null,
        dateCollected: new Date(),
        bonus: null,
        description: null,
    });
    
    return (
        <CollectContext.Provider value={{ form: collectForm, setForm: setCollectForm}}>
            {children}
        </CollectContext.Provider>
    );
}