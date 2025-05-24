import {createContext, useContext} from "react";

export type CollectForm = {
    collectionId?: string|null;
    categoryId?: string|null;
    collectibleId?: string|null;
    imageUri?: string|null;
    dateCollected?: Date|null;
    description?: string|null;
    bonus?: boolean|null;
}

export interface CollectContextType {
    form: CollectForm; 
    setForm: (form: CollectForm) => void;
}

export const CollectContext = createContext<CollectContextType | null>(null);

export const useCollectContext = () => {
    const context = useContext(CollectContext);
    if (!context) {
        throw new Error("useCollectContext must be used within a CollectProvider");
    }
    return context;
}