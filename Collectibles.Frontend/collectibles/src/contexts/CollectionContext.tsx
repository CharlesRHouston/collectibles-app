import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {Collection} from "../types/collection";

export interface CollectionContextType {
    collections: Collection[] | null;
    setCollections: Dispatch<SetStateAction<Collection[] | null>>;
}

export const CollectionContext = createContext<CollectionContextType | null>(null);
export const useCollectionContext = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("useCollectionContext must be used within a CollectionProvider");
    }
    return context;
};