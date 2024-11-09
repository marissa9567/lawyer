import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const CollapsibleCommentForm = ({ postId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (name && comment && date) {
            const commentRef = doc(db, 'posts', postId, 'comments', `${Date.now()}`);
            await setDoc(commentRef, {
                name,
                text: comment,
                date,
                createdAt: new Date(),
            });
            setName('');
            setComment('');
            setDate('');
            setIsOpen(false); // Collapse the form after submission
        }
    };

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Hide Comment Form' : 'Add Comment'}
            </button>
            {isOpen && (
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        
                    />
                    <textarea
                        placeholder="Your Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Comment</button>
                </form>
            )}
        </div>
    );
};

export default CollapsibleCommentForm;
