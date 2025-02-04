'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const changePass = async () => {

        if (!email || !newPassword) {
            alert('Email and password is required');
            return;
        }

        try {
            const response = await axios.post('  http://localhost:4000/control/resetpassword', { email,newPassword });
            console.log(response)

            if (response.data.success) {
                alert(response.data.message)
                router.push('/login');
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
                    <p className='mx-auto text-3xl mb-7 text-center'>Reset Password</p>
                    <p className='text-center text-xs'>Please enter your new password</p>
                </div>
                <div className='mt-9 flex flex-col gap-3'>
                    <input
                        placeholder='Your Email'
                        className='px-4 py-2 border border-black rounded-xl w-full bg-white'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input placeholder='New Password' className='bg-white px-4 py-2 border border-black rounded-xl w-full' type="password" value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <div className=''>
                    <button onClick={changePass} className='bg-black text-white w-full py-2 rounded-xl mt-6'>RESET PASSWORD</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPass;