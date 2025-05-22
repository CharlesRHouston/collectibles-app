import {Dispatch, SetStateAction} from "react";

interface Rules {
    condition: boolean;
    message: string;
}

export const validateForm = (
    errors: string[],
    setErrors: Dispatch<SetStateAction<string[]>>,
    rules: Rules[]
) => {
    const updatedErrors = new Set(errors);

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