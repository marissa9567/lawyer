import React from 'react';
import { db } from '../components/firebase'; // Adjust the path as necessary
import MessageList from "../components/Messagelist";
import MessageForm from './Messageform';
import '../styles/Contact.css'; // Import CSS for styling

const Contact = () => {
    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <div className="message-section">
                <MessageForm />
                <MessageList />
            </div>
        </div>
    );
};

export default Contact;
