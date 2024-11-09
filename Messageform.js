import React, { useState } from 'react';
import { db } from '../components/firebase'; // Adjust the path as necessary
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/Messageform.css'; // Optional: add a CSS file for styling
import { useAuth } from '../Context/AuthContext';
const MessageForm = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState(''); // New state for the username
    const { currentUser } = useAuth();
    const sendMessage = async (e) => {
        e.preventDefault(); // Prevent the form from submitting

        try {
            const messagesRef = collection(db, 'messages');
            await addDoc(messagesRef, {
                text: message,
                username: username || 'Anonymous', // Default to "Anonymous" if no username
                createdAt: serverTimestamp(),
            });
            console.log('Message sent!');
            setMessage(''); // Clear the input after sending
            setUsername(''); // Clear username field
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <form onSubmit={sendMessage} className="message-form">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name (optional)"
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
            />
            <button type="submit">Send Message</button>
        </form>
    );
};

export default MessageForm;
