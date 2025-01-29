"use client"
import React, { useState, useEffect } from 'react';

const page = () => {

    const [logs, setLogs] = useState('');

    useEffect(() => {
        fetch(' http://localhost:4000/control/logs')
            .then(response => response.text())
            .then(data => setLogs(data))
            .catch(error => alert(error));
    }, []);

    // console.log(logs)

    return (
        <div className='p-10'>
            <h1>Activity Logs</h1>
            <ol className="relative border-s border-gray-200 dark:border-gray-700">                  
                
                <li className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April 2022</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code in Tailwind CSS</h3>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements built on top of Tailwind CSS.</p>
                </li>

            </ol>
        </div>
    );
};

export default page;