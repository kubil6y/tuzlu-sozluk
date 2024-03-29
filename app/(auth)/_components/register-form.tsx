"use client";

import { FormWrapper } from "./form-wrapper";

export const RegisterForm = () => {
    return (
        <FormWrapper label="Create an account" backButtonText="Already have an account?" backButtonHref="/login">
            <h1>RegisterForm</h1>
        </FormWrapper>
    );
};
