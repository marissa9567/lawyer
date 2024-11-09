import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import '../styles/Messagelist.css'; // Optional: add a CSS file for styling

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const { currentUser } = useAuth();
    useEffect(() => {
        const messagesRef = collection(db, 'messages');
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, snapshot => {
            const messagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(messagesData);
        });

        return () => unsubscribe();
    }, []);

    const deleteMessage = async (messageId) => {
        const messageRef = doc(db, 'messages', messageId);
        await deleteDoc(messageRef);
    };

    return (
        <div>
            {currentUser && (  
            <h1>Messages</h1>)}
            <p className='message-requirement'>Please include email, phone number, and name</p>
           <ul>
                {messages.map(message => (
                    <ul key={message.id}>
                      {currentUser && (    <div>
                            <strong>{message.username}</strong>: {message.text} <br />
                            <small>{new Date(message.createdAt?.toDate()).toLocaleString()}</small>
                          
                            {currentUser && (  
                            <button onClick={() => deleteMessage(message.id)}>Delete Message</button>)}
                        </div>)}
              
                    </ul>
                ))}
            </ul>
        </div>
    );
};

export default MessageList;
