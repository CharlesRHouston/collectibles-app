import DatabaseService from "../../api/DatabaseService";
import axios from "axios";
import {CollectForm} from "../../context/CollectContext";

export const onSubmitCollect = async (
    form: CollectForm, 
    errors: string[], 
    setErrors:  React.Dispatch<React.SetStateAction<string[]>>
) => {
    try {
        await DatabaseService.putCollectible(
            form.collectibleId!,
            {
                collectedAt: form.dateCollected!.toISOString(),
                active: true,
                description: form.description!,
                bonusAchieved: form.bonus ?? false,
                imageUrl: form.imageUrl ?? "placeholder",
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