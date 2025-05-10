import {CollectForm} from "../../context/CollectContext";

export const validateAddDetails = (
    form: CollectForm, 
    errors: string[], 
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const updatedErrors = new Set(errors);

    const rules = [
        {
            condition: form.dateCollected === null,
            message: "Date must be provided.",
        },
        {
            condition: form.description === null || form.description!.length === 0,
            message: "Description must be provided.",
        },
        {
            condition: form.bonus === null,
            message: "Bonus must be selected.",
        }
    ];

    rules.forEach(({ condition, message }) => {
        if (condition) {
            updatedErrors.add(message);
        } else {
            updatedErrors.delete(message);
        }
    });

    setErrors(Array.from(updatedErrors));

    return updatedErrors.size === 0;
}

export const validateChooseCollectible = (
    form: CollectForm,
    errors: string[],
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const updatedErrors = new Set(errors);

    const rules = [
        {
            condition: form.collectionId === null,
            message: "Collection must be selected.",
        },
        {
            condition: form.collectibleId === null,
            message: "Collectible must be selected.",
        },
    ];

    rules.forEach(({ condition, message }) => {
        if (condition) {
            updatedErrors.add(message);
        } else {
            updatedErrors.delete(message);
        }
    });

    setErrors(Array.from(updatedErrors));

    return updatedErrors.size === 0;
}