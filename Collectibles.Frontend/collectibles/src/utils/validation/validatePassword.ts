import {SignupForm} from "../../types/Authentication";
import React from "react";

export const ValidatePassword = (
        signupForm : SignupForm, 
        setSignupForm :  React.Dispatch<React.SetStateAction<SignupForm>>
    ) => {
    const { value: value, errors: currentErrors } = signupForm.password;
    const updatedErrors = new Set(currentErrors);

    const rules = [
        {
            condition: value.length < 12,
            message: "Password must be as least 12 characters.",
        },
        // {
        //     condition: !/[^A-Za-z0-9_]/.test(value),
        //     message: "Password must contain a symbol.",
        // },
    ];

    rules.forEach(({ condition, message }) => {
        if (condition) {
            updatedErrors.add(message);
        } else {
            updatedErrors.delete(message);
        }
    });

    setSignupForm((prev) => ({
        ...prev,
        password: {
            ...prev.password,
            errors: Array.from(updatedErrors),
        },
    }));
}

export const ValidateConfirmPassword = (signupForm : SignupForm, setSignupForm :  React.Dispatch<React.SetStateAction<SignupForm>>) => {
    const { value: value, errors: currentErrors } = signupForm.confirmPassword;
    const updatedErrors = new Set(currentErrors);

    const message = "Passwords do not match.";

    if (signupForm.confirmPassword.value != signupForm.password.value) {
        updatedErrors.add(message);
    } else {
        updatedErrors.delete(message);
    }

    setSignupForm((prev) => ({
        ...prev,
        confirmPassword: {
            ...prev.confirmPassword,
            errors: Array.from(updatedErrors),
        },
    }));
}