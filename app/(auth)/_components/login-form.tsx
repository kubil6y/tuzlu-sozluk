"use client";

import { FormWrapper } from "./form-wrapper";

export const LoginForm = () => {
    return (
        <FormWrapper label="Welcome Back!" backButtonText="Don't have an account?" backButtonHref="/register">
            <h1>LoginForm</h1>
        </FormWrapper>
    );
};
