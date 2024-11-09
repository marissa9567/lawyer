import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';

const DisplayMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const snapshot = await db.collection('messages').orderBy('createdAt', 'desc').get();
                const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMessages(messagesData);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.length > 0 ? (
                    messages.map(msg => (
                        <li key={msg.id}>{msg.text}</li>
                    ))
                ) : (
                    <li>No messages yet.</li>
                )}
            </ul>
        </div>
    );
};

export default DisplayMessages;
