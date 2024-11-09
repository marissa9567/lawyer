import { useState, useEffect } from 'react';
import { db } from '../components/firebase'; // Adjust path if needed
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `posts/${postId}/comments`), (snapshot) => {
            const commentsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsArray);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [postId]);

    const addComment = async (content) => {
        if (!content) return;
        await addDoc(collection(db, `posts/${postId}/comments`), { content });
    };

    return { comments, loading, addComment };
};

export default useComments;
