"use client"

import React, { useState, useEffect } from 'react';

const page = () => {

    const [logs, setLogs] = useState('');

    useEffect(() => {
        fetch('https://api.sampleapis.com/coffee/hot')
            .then(response => response.text())
            .then(data => setLogs(data))
            .catch(error => console.error('Error fetching logs:', error));
    }, []);

    return (
        <div>
            <h1>pgAdmin Activity Logs</h1>
            <pre>{logs}</pre>
        </div>
    );
};

export default page;