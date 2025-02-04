'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleResetPassword = async () => {

        if (!email) {
            alert('Email is required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/control/sendotp', { email });
            if (response.status === 201) {
                alert(response.data.message)
                router.push('/verifyotp');
            }
            
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    return (
        <div className='my-20 flex justify-center'>
            <div className='mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black relative'>
                <Link href='/login' className='text-xs border border-black px-4 py-1 rounded-l-full absolute right-0'>BACK</Link>
                <div className='mt-14'>
                    <p className='mx-auto text-3xl mb-7 text-center'>Forgot Password</p>
                    <p className='text-center text-xs'>Please enter your email</p>
                </div>
                <div className='mt-9 flex flex-col gap-5'>
                    <input
                        placeholder='Your Email'
                        className='px-4 py-2 border border-black rounded-xl w-full bg-white'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className=''>
                    <button 
                        className='bg-black text-white w-full py-2 rounded-xl mt-4'
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;
