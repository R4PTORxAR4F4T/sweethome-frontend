'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        // Validate fields before sending request
        if (!email || !password || !userName || !userType) {
            alert('Please fill in all fields!');
            return;
        }

        setLoading(true); // Show loading spinner

        try {
            const res = await axios.post('http://localhost:4000/control/register', {
                email,
                password,
                userName,
                userType,
            });

            // If the user is created successfully, reset the form fields
            if (res.data.message === 'User Created Successfully') {
                alert(res.data.message);
                router.push('/login');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Hide loading spinner after the request completes
        }
    };

    return (
        <div className="my-20 flex justify-center">
            <div className="mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black">
                <div className="">
                    <p className="mx-auto text-3xl mb-7 text-center">Sign Up</p>
                    <p className="text-center text-xs">Please provide your information to sign up</p>
                </div>
                <div className="mt-9 flex flex-col gap-3">
                    <input
                        placeholder="Username"
                        className="bg-white px-4 py-2 border border-black rounded-xl w-full"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} // Update state on change
                    />
                    <input
                        placeholder="Email"
                        className="bg-white px-4 py-2 border border-black rounded-xl w-full"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update state on change
                    />
                    <input
                        placeholder="Password"
                        className="bg-white px-4 py-2 border border-black rounded-xl w-full"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on change
                    />
                    <select
                        className="bg-white px-3 py-2 border border-black rounded-xl w-full"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)} // Update state on change
                    >
                        <option value="">Select User Type</option>
                        <option value="user">User</option>
                        <option value="landlord">Landlord</option>
                    </select>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleRegister}
                        className="bg-black text-white w-full py-2 rounded-xl mt-7"
                        disabled={loading} // Disable the button while loading
                    >
                        {loading ? 'Signing up...' : 'SIGN UP'}
                    </button>
                    <div className="flex justify-center mt-2">
                        <Link href="/login" className="py-2 rounded-xl">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
