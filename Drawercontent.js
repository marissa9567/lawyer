import React, { useState } from 'react';
import { db } from '../components/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Update imports

const DrawerContent = () => {
  const [articleLink, setArticleLink] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSave = async () => {
    if (articleLink && imageLink) {
      try {
        await addDoc(collection(db, 'articles'), {
          articleLink,
          imageLink,
          createdAt: serverTimestamp(), // Use serverTimestamp for Firestore
        });
        alert("Article saved successfully!");
        setArticleLink('');
        setImageLink('');
      } catch (error) {
        console.error("Error saving article:", error);
      }
    } else {
      alert("Please fill out both fields");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter article link"
        value={articleLink}
        onChange={(e) => setArticleLink(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter image link"
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DrawerContent;
