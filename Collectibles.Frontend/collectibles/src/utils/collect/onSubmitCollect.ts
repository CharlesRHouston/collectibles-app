import ApiService from "../../services/apiService";
import axios from "axios";
import {CollectForm} from "../../contexts/CollectContext";
import {useCollectionContext} from "../../contexts/CollectionContext";

const getCategoryType = (
    collectionId: string, 
    collectibleId: string
) => {
    const { collections } = useCollectionContext();
    
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
    errors: string[], 
    setErrors:  React.Dispatch<React.SetStateAction<string[]>>
) => {
    try {
        await ApiService.putCollectible(
            form.collectibleId!,
            {
                collectedAt: form.dateCollected!.toISOString(),
                active: true,
                description: form.description!,
                bonusAchieved: form.bonus!,
                imageUrl: form.imageUrl ?? "placeholder",
                collectionId: form.collectionId!,
                categoryType: getCategoryType(form.collectionId!, form.collectibleId!)!
            }
        )

        setErrors([]);
    } catch(error) {
        let errorMessage = "An unexpected error occurred.";

        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data;
        }

        setErrors([...errors, errorMessage]);
    }
}