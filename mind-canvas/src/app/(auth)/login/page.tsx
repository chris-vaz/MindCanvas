'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter();
    const [submitError, setSubmitError] = useState('');
    return <div>LoginPage</div>;

}

export default LoginPage