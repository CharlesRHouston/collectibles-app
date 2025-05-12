import ApiService from "../../services/apiService";
import axios from "axios";
import {CollectForm} from "../../contexts/CollectContext";
import {Collection} from "../../types/collection";
import {UserCollectible} from "../../types/userCollectible";
import {Dispatch, SetStateAction} from "react";

const getCategoryType = (
    collections: Collection[],
    collectionId: string, 
    collectibleId: string
) => {
    const collection = collections!.find(
        collection => collection.id === collectionId
    );

    for (const category of collection!.categories) {
        if (category.collectibles.find(c => c.id === collectibleId)) {
            return category.type;
        }
    }
}

export const onSubmitCollect = async (
    form: CollectForm, 
    setForm:  (form: CollectForm) => void,
    errors: string[], 
    setErrors:  Dispatch<SetStateAction<string[]>>,
    userCollectibles: UserCollectible[],
    setUserCollectibles: Dispatch<SetStateAction<UserCollectible[]|null>>,
    collections: Collection[],
) => {
    try {
        const request = {
            collectionId: form.collectionId!,
            collectedAt: form.dateCollected!.toISOString(),
            active: true,
            description: form.description!,
            bonusAchieved: form.bonus!,
            imageUrl: form.imageUrl ?? "placeholder",
            categoryType: getCategoryType(collections, form.collectionId!, form.collectibleId!)!
        }
        
        await ApiService.putCollectible(
            form.collectibleId!,
            request
        );
        
        setUserCollectibles([
            ...userCollectibles,
            {
                collectibleId: form.collectibleId!,
                ...request
            }
        ])

        setForm({
            collectionId: null,
            collectibleId: null,
            imageUrl: null,
            dateCollected: new Date(),
            description: null,
            bonus: null,
        });

        setErrors([]);
    } catch(error) {
        let errorMessage = "An unexpected error occurred.";

        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data;
        }

        setErrors([...errors, errorMessage]);
    }
}