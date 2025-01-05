import React from 'react';

const Login = () => {
    return (
        <div className='my-20 flex justify-center'>
            <div className='mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black'>
                <div className=''>
                    <p className='mx-auto text-3xl mb-7 text-center'>Welcome Back !!</p>
                    <p className='text-center text-xs'>Please enter your credentials to log in</p>
                </div>
                <div className='mt-9 flex flex-col gap-5'>
                    <input placeholder='Username' className='bg-white px-4 py-2 border border-black rounded-xl w-full' type="text" />
                    <input placeholder='Password' className='bg-white px-4 py-2 border border-black rounded-xl w-full' type="password" />
                </div>
                <div className='mt-4'>
                    <a className='text-sm' href="">Forgot password?</a>
                    <button className='bg-black text-white w-full py-2 rounded-xl mt-7'>SIGN IN</button>
                    <button className='w-full py-2 rounded-xl'>Sign up?</button>
                </div>
            </div>
        </div>
    );
};

export default Login;