import React from 'react';

const Register = () => {
    return (
        <div className='my-20 flex justify-center'>
            <div className='mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black'>
                <div className=''>
                    <p className='mx-auto text-3xl mb-7 text-center'>Sign Up</p>
                    <p className='text-center text-xs'>Please provide your information to sign up</p>
                </div>
                <div className='mt-9 flex flex-col gap-3'>
                    <input placeholder='Username' className='px-4 py-2 border border-black rounded-xl w-full' type="text" />
                    <input placeholder='Email' className='px-4 py-2 border border-black rounded-xl w-full' type="email"/>
                    <input placeholder='Password' className='px-4 py-2 border border-black rounded-xl w-full' type="password" />
                    <select className='px-3 py-2 border border-black rounded-xl w-full' name="" id="">
                        <option value="User">User</option>
                        <option value="Landlord">Landlord</option>
                    </select>
                </div>
                <div className='mt-4'>
                    <button className='bg-black text-white w-full py-2 rounded-xl mt-7'>SIGN UP</button>
                </div>
            </div>
        </div>
    );
};

export default Register;