import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import "../styles/Comments.css";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Adjust the path if necessary

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');
    const [replyText, setReplyText] = useState({}); // State to hold replies for each comment
    const { currentUser } = useAuth();

    // Fetch comments from Firestore
    const fetchComments = async () => {
        const commentsRef = collection(db, `posts/${postId}/comments`);
        const q = query(commentsRef, orderBy('timestamp', 'desc')); // Order comments by timestamp
        const querySnapshot = await getDocs(q);
        const commentsArray = await Promise.all(querySnapshot.docs.map(async (doc) => {
            const repliesRef = collection(db, `posts/${postId}/comments/${doc.id}/replies`);
            const repliesSnapshot = await getDocs(repliesRef);
            const repliesArray = repliesSnapshot.docs.map(replyDoc => ({ id: replyDoc.id, ...replyDoc.data() }));

            return {
                id: doc.id,
                ...doc.data(),
                replies: repliesArray, // Add replies to the comment
            };
        }));
        setComments(commentsArray);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (newComment.trim() === '' || name.trim() === '') return; // Prevent empty comments or names

        try {
            await addDoc(collection(db, `posts/${postId}/comments`), {
                text: newComment,
                name: name, // Include the name with the comment
                timestamp: new Date(),
            });
            setNewComment(''); // Clear the input
            setName(''); // Clear the name input
            fetchComments(); // Refresh comments after submission
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        const commentRef = doc(db, `posts/${postId}/comments/${commentId}`);
        
        try {
            await deleteDoc(commentRef);
            fetchComments(); // Refresh comments after deletion
        } catch (error) {
            console.error("Error deleting comment: ", error);
        }
    };

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();

        const reply = replyText[commentId];

        if (!reply || reply.trim() === '') return; // Prevent empty replies

        try {
            await addDoc(collection(db, `posts/${postId}/comments/${commentId}/replies`), {
                text: reply,
                timestamp: new Date(),
            });
            setReplyText({ ...replyText, [commentId]: '' }); // Clear the reply input for that comment
            fetchComments(); // Refresh comments after submission
        } catch (error) {
            console.error("Error adding reply: ", error);
        }
    };

    return (
        <div className="comments-container">
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map(comment => (
                    <li className="comment" key={comment.id}>
                        <p><strong>{comment.name}:</strong> {comment.text}</p> {/* Display name with comment */}
                        <small>{new Date(comment.timestamp?.toDate()).toLocaleString()}</small>

                        {/* Delete Button */}
                        {currentUser && (
                        <button onClick={() => handleCommentDelete(comment.id)}>Delete</button>)}

                        {/* Reply Form */}
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="reply-form">
                            {currentUser && ( 
                                <textarea
                                    value={replyText[comment.id] || ''}
                                    onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                                    placeholder="Add a reply..."
                                />
                            )}
                            {currentUser && (
                                <button type="submit">Reply</button> 
                            )}
                        </form>

                        {/* Replies List */}
                        <ul>
                            {comment.replies && comment.replies.map(reply => (
                                <li className="reply" key={reply.id}>
                                    <p>{reply.text}</p>
                                    <small>{new Date(reply.timestamp?.toDate()).toLocaleString()}</small>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Comments;
