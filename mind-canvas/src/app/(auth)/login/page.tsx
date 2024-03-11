'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

// Importing necessary Zod packages
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { FormSchema } from '@/lib/types';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../public/cypresslogo.svg'

const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState('');

    // z.infer - extracts the inferred type
    // In the case of FormSchema, { email: string }{ pw: string } 

    // extract the inferred type like this
    // type Dog = z.infer<typeof Dog>;

    // // equivalent to:
    // type Dog = {
    //   name: string;
    //   age: number;
    // };

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema), // This integrates Zod validation with react-hook-form. It uses the provided FormSchema to define the validation rules for your form fields.
        defaultValues: { email: '', password: '' }, // This sets the initial values for your form's email and password fields as empty strings.
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {

    };


    return (
        <Form {...form}>
            <form
                onChange={() => {
                    if (submitError) setSubmitError('');
                }}
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-column'>
                <Link href="/" className='w-full flex justify-left items-center'>
                    <Image src={Logo} alt="MindCanvas Logo" width={50} height={50} />
                </Link>
            </form>
        </Form>
    )

}

export default LoginPage