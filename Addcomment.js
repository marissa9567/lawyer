import { getFirestore, collection, doc, addDoc } from "firebase/firestore"; 

const db = getFirestore();

const addComment = async (postId, commentData) => {
    try {
        const commentsRef = collection(db, 'posts', postId, 'comments');
        await addDoc(commentsRef, {
            ...commentData,
            timestamp: new Date(), // Optional: add timestamp
        });
        console.log("Comment added successfully!");
    } catch (error) {
        console.error("Error adding comment:", error);
    }
};
