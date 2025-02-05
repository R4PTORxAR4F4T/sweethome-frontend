'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const ChatPage = () => {
    const { ticketId } = useParams(); 
    const [messages, setMessages] = useState([]);
    const router = useRouter();

    // Extract user info from cookie
    const userInfoCookie = Cookies.get('userInfo');
    let currentUserId = null;

    if (userInfoCookie) {
        try {
            const userInfo = JSON.parse(userInfoCookie);
            currentUserId = userInfo.userId; // Extract userId
        } catch (error) {
            console.error("Error parsing userInfo cookie:", error);
        }
    }

    useEffect(() => {
        if (!currentUserId) {
            router.push('/login'); // Redirect if no user ID is found
        } else {
            fetchChat();
        }
    }, [currentUserId]);

    const fetchChat = async () => {
        try {
            if (!ticketId) return;

            const response = await axios.get(`http://localhost:4000/control/ticketchat/${ticketId}`, { withCredentials: true });
            if (response.status === 200) {
                setMessages(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                router.push("/login");
            } else {
                console.error("Error fetching chat:", error);
            }
        }
    };

    return (
        <div className='p-5'>
            <h1 className="text-xl font-bold mb-4">Chat for Ticket #{ticketId}</h1>
            <div className="chat-box bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.userId === currentUserId ? 'justify-start' : 'justify-end'} mb-2`}>
                            <div className={`p-3 rounded-lg max-w-xs text-white ${msg.userId === currentUserId ? 'bg-blue-500' : 'bg-green-500'}`}>
                                <p className="text-sm"><strong>{msg.userId === currentUserId ? 'You' : `User ${msg.userId}`}:</strong></p>
                                <p className="text-md">{msg.message}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No messages found.</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
