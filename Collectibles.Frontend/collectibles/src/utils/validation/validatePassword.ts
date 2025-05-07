import {FieldState, PasswordForm, SignupForm} from "../../types/Authentication";
import React from "react";

export const ValidatePassword = <T extends PasswordForm>(
        password : FieldState, 
        setSignupForm :  React.Dispatch<React.SetStateAction<T>>
    ) => {
    const updatedErrors = new Set(password.errors);

    const rules = [
        {
            condition: password.value.length < 10,
            message: "Password must be as least 10 characters.",
        },
        {
            condition: !/[^A-Za-z0-9_]/.test(password.value),
            message: "Password must contain a symbol.",
        },
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

export const ValidateConfirmPassword = <T extends PasswordForm>(
    password : FieldState, 
    confirmPassword : FieldState, 
    setForm :  React.Dispatch<React.SetStateAction<T>>
) => {
    const updatedErrors = new Set(confirmPassword.errors);

    const message = "Passwords do not match.";

    if (password.value != confirmPassword.value) {
        updatedErrors.add(message);
    } else {
        updatedErrors.delete(message);
    }

    setForm((prev) => ({
        ...prev,
        confirmPassword: {
            ...prev.confirmPassword,
            errors: Array.from(updatedErrors),
        },
    }));
}