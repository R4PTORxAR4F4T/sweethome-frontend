import React from 'react';

const ForgotPass = () => {
    return (
        <div className='my-20 flex justify-center'>
            <div className='mx-2 bg-white border-solid border-2 border-black rounded p-12 lg:p-20 text-black relative'>
                <a href='' className='text-xs border border-black px-4 py-1 rounded-l-full absolute right-0'>BACK</a>
                <div className='mt-14'>
                    <p className='mx-auto text-3xl mb-7 text-center'>Forgot Password</p>
                    <p className='text-center text-xs'>Please enter your number</p>
                </div>
                <div className='mt-9 flex flex-col gap-5'>
                    <input placeholder='Mobile Number' className='px-4 py-2 border border-black rounded-xl w-full bg-white' type="number" />
                </div>
                <div className=''>
                    <button className='bg-black text-white w-full py-2 rounded-xl mt-4'>Reset Password</button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPass;