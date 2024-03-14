import React from 'react'
import { z } from 'zod'

const SignUpFormSchema = z
    .object({
        email: z.string().describe('Email').email({ message: 'Invalid Email' }),
        password: z
            .string()
            .describe('Password')
            .min(6, 'Password must be minimum 6 characters'),
        confirmPassword: z
            .string()
            .describe('Confirm Password')
            .min(6, 'Password must be minimum 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        // Adding custom validation logic here
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    });

// refine (used above) allows you to define custom logic for specific use cases.
const Signup = () => {
    return (
        <div>Signup</div>
    )
}

export default Signup