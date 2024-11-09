import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';

const DisplayImage = ({ userId }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      if (userId) {
        const userDocRef = doc(db, 'users', userId); // Use userId prop to get the specific document
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageUrl(data.imageUrl);
        } else {
          console.log('No such document!'); // Log this for debugging
        }
      }
    };
    fetchImage();
  }, [userId]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px', maxHeight: '300px' }} />
      ) : (
        <p>No image uploaded yet.</p>
      )}
    </div>
  );
};

export default DisplayImage;
