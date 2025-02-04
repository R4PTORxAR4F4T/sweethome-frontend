'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for app directory

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const validateFields = () => {
        if (!email || !password) {
            alert('Both email and password are required!');
            return false;
        }
        return true;
    };

    
    const handleLogin = async () => {
        if (!validateFields()) return;

        try {
            const res = await axios.post('http://localhost:4000/control/login', {
                email: email,
                password: password,
            }, { withCredentials: true });
            
            if (res.data && res.data.accessToken) {
                alert(`${res.data.message}`);

                router.push('/dashboard');
            } else {
                alert('Invalid login response. Please try again.');
            }
        } catch (error) {
            // Display the error message if login fails
            const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
            alert(errorMessage);
        }
    };

    return (
        <div className="my-20 flex justify-center">
            <div className="mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black">
                <div>
                    <p className="mx-auto text-3xl mb-7 text-center">Welcome Back !!</p>
                    <p className="text-center text-xs">Please enter your credentials to log in</p>
                </div>
                <div className="mt-9 flex flex-col gap-5">
                    <input
                        id="email"
                        placeholder="Email"
                        className="bg-white px-4 py-2 border border-black rounded-xl w-full"
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="Password"
                        placeholder="Password"
                        className="bg-white px-4 py-2 border border-black rounded-xl w-full"
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <Link className="text-sm" href="/forgot">
                        Forgot password?
                    </Link>
                    <button
                        onClick={handleLogin}
                        className="bg-black text-white w-full py-2 rounded-xl mt-7"
                    >
                        SIGN IN
                    </button>
                    <div className="flex justify-center mt-2">
                        <Link href="/register" className="py-2 rounded-xl">
                            Sign up?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
