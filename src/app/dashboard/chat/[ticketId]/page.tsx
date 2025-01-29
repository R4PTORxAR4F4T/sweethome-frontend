'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

const ChatPage = () => {
    const { ticketId } = useParams(); // Extract ticketId from URL
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!ticketId) return;

        const fetchChat = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/control/ticketchat/${ticketId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        };

        fetchChat();
    }, [ticketId]);

    return (
        <div>
            <h1>Chat for Ticket #{ticketId}</h1>
            <div className="chat-box">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className="message">
                            <p><strong>sender {msg.userId}:</strong> {msg.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
