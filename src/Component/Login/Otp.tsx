'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Otp = () => {

    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const router = useRouter();

    const verifyOTP = async () => {

        if (!email) {
            alert('Email is required');
            return;
        }

        try {
            const response = await axios.post(' http://localhost:4000/control/verifyotp', { email,otp });
            console.log(response)

            if (response.data.verified) {
                alert(response.data.message)
                router.push('/resetpass');
            }
            else(
                alert(response.data.message)
            )
            
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to send OTP');
        }
    };

    return (
        <div className='my-20 flex justify-center'>
            <div className='mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black relative'>
                <a href='' className='text-xs border border-black px-4 py-1 rounded-l-full absolute right-0'>BACK</a>
                <div className='mt-14'>
                    <p className='mx-auto text-3xl mb-7 text-center'>Check Your Phone</p>
                    <p className='text-center text-xs'>Please the OTP to proceed</p>
                </div>
                <div className='mt-9 flex flex-col gap-5'>
                    <input
                        placeholder='Your Email'
                        className='px-4 py-2 border border-black rounded-xl w-full bg-white'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input placeholder='OTP' className='bg-white px-4 py-2 border border-black rounded-xl w-full' type="text" value={otp}
                        onChange={(e) => setOTP(e.target.value)}/>
                </div>
                <div className=''>
                    <button onClick={verifyOTP} className='bg-black text-white w-full py-2 rounded-xl mt-4'>VERIFY</button>
                </div>
            </div>
        </div>
    );
};

export default Otp;