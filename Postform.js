import React, { useState } from 'react';
import { db, storage } from '../components/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        imageUrl: '',
        articleUrl: '',
        titleFontColor: '#000000',
        titleFontStyle: 'normal',
        titleFontSize: 16,
        contentFontColor: '#000000',
        contentFontStyle: 'normal',
        contentFontSize: 16,
        backgroundPattern: 'none',
        borderColor: '#000000',
        borderStyle: 'solid',
        borderWidth: 1,
    });
    const [editPostId, setEditPostId] = useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            setFormData(prev => ({ ...prev, imageUrl }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postRef = editPostId ? doc(db, 'posts', editPostId) : doc(db, 'posts', Date.now().toString());
            await setDoc(postRef, { ...formData }, { merge: true });
            resetForm();
        } catch (error) {
            console.error("Error adding/updating post: ", error);
            alert("There was an error. Please try again.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            content: '',
            imageUrl: '',
            articleUrl: '',
            titleFontColor: '#000000',
            titleFontStyle: 'normal',
            titleFontSize: 16,
            contentFontColor: '#000000',
            contentFontStyle: 'normal',
            contentFontSize: 16,
            backgroundPattern: 'none',
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: 1,
        });
        setEditPostId(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Add form fields here, similar to previous example */}
            <button type="submit">Save</button>
        </form>
    );
};

export default PostForm;
